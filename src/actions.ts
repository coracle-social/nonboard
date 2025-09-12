import {assoc} from '@welshman/lib'
import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
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
}

export const createActions = (options: ApplicationOptions, state: ApplicationState): ApplicationActions => {
  const destroyHistory = syncHistory(options, state)

  return {
    back: () => options.history.back(),
    goto: (view: View) => options.history.pushState({view}, ""),
    destroy: () => {
      destroyHistory()
    },
  }
}
