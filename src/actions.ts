import {spec, assoc} from '@welshman/lib'
import {request} from '@welshman/net'
import {PROFILE, RELAYS, getRelayTagValues, deduplicateEvents} from '@welshman/util'
import type {SignedEvent, TrustedEvent} from '@welshman/util'
import type {ISigner} from '@welshman/signer'
import type {ApplicationOptions} from './options'
import type {ApplicationState, ProfileValues} from './state'
import type {View} from './view'

const syncHistory = (options: ApplicationOptions, state: ApplicationState) => {
  let destroyed = false

  // Monkey patch pushState
  const pushState = options.history.pushState
  options.history.pushState = (_state, title, url) => {
    if (!destroyed && _state.view) {
      state.update(assoc('view', _state.view))
    }

    return pushState.call(options.history, _state, title, url)
  }

  // Monkey patch replaceState
  const replaceState = options.history.replaceState
  options.history.replaceState = (_state, title, url) => {
    if (!destroyed && _state.view) {
      state.update(assoc('view', _state.view))
    }

    return replaceState.call(options.history, _state, title, url)
  }

  // Listen for back button
  const onPopState = (event: PopStateEvent) => {
    if (event.state.view) {
      state.update(assoc('view', event.state.view))
    }
  }

  window.addEventListener('popstate', onPopState)

  // Initialize history
  options.history.replaceState({view: state.get().view}, "")

  // Unsubscribe when destroyed. Don't un-monkey-patch in case someone else did
  return () => {
    destroyed = true
    window.removeEventListener('popstate', onPopState)
  }
}

export type ApplicationActions = {
  back: () => void
  goto: (view: View) => void
  destroy: () => void
  updateProfile: (profile: Partial<ProfileValues>) => void
  fetchUserData: (signer: ISigner) => Promise<SignedEvent[]>
}

export const createActions = (options: ApplicationOptions, state: ApplicationState): ApplicationActions => {
  const destroyHistory = syncHistory(options, state)

  return {
    back: () => options.history.back(),
    goto: (view: View) => options.history.pushState({view}, ""),
    destroy: () =>  destroyHistory(),
    updateProfile: (profile: Partial<ProfileValues>) => {
      state.update($s => ({...$s, profile: {...$s.profile, ...profile}}))
    },
    fetchUserData: async (signer: ISigner) => {
      const pubkey = await signer.getPubkey()
      const events = await request({
        autoClose: true,
        signal: AbortSignal.timeout(3000),
        relays: options.indexerRelays,
        filters: [{kinds: [RELAYS, PROFILE], authors: [pubkey]}],
      })

      const relaysEvent = events.find(spec({kind: RELAYS}))
      const profileEvent = events.find(spec({kind: PROFILE}))

      if (relaysEvent && !profileEvent) {
        await request({
          autoClose: true,
          signal: AbortSignal.timeout(3000),
          relays: getRelayTagValues(relaysEvent.tags),
          filters: [{kinds: [RELAYS, PROFILE], authors: [pubkey]}],
          onEvent: (event: TrustedEvent) => events.push(event),
        })
      }

      return deduplicateEvents(events) as SignedEvent[]
    },
  }
}
