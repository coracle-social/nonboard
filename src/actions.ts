import {assoc} from '@welshman/lib'
import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
import type {Screen} from './screen'

const syncHistory = (options: ApplicationOptions, state: ApplicationState) => {
  let destroyed = false

  const pushState = options.history.pushState
  options.history.pushState = (_state, title, url) => {
    if (!destroyed && _state.screen) {
      state.update(assoc('screen', _state.screen))
    }

    return pushState.call(options.history, _state, title, url)
  }

  const replaceState = options.history.replaceState
  options.history.replaceState = (_state, title, url) => {
    if (!destroyed && _state.screen) {
      state.update(assoc('screen', _state.screen))
    }

    return replaceState.call(options.history, _state, title, url)
  }

  const onPopState = (event: PopStateEvent) => {
    if (event.state.screen) {
      state.update(assoc('screen', event.state.screen))
    }
  }

  window.addEventListener('popstate', onPopState)

  return () => {
    destroyed = true
    window.removeEventListener('popstate', onPopState)
  }
}

export type ApplicationActions = {
  back: () => void
  goto: (screen: Screen) => void
  destroy: () => void
}

export const createActions = (options: ApplicationOptions, state: ApplicationState): ApplicationActions => {
  const destroyHistory = syncHistory(options, state)

  return {
    back: () => options.history.back(),
    goto: (screen: Screen) => options.history.pushState({screen}, ""),
    destroy: () => {
      destroyHistory()
    },
  }
}
