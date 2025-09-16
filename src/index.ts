export * from './view'

import m from 'mithril'
import type {PartialApplicationOptions} from './options'
import {createOptions} from './options'
import {createState, initialState} from './state'
import {createActions} from './actions'
import {createComponents} from './components'
import {createApplication} from './application'

export default (opts: PartialApplicationOptions) => {
  const state = createState()
  const options = createOptions(opts)
  const actions = createActions(options, state)
  const components = createComponents()
  const application = createApplication({
    options,
    state,
    actions,
    components,
  })

  let destroyed =  false
  let mountPoint: Element | undefined
  let unsubscribe: (() => void) | undefined

  const mount = (element: Element) => {
    if (destroyed) {
      throw new Error("Application has been destroyed")
    }

    if (mountPoint) {
      throw new Error("Application is already mounted, call `unmount()` first")
    }

    mountPoint = element

    for (const child of mountPoint.childNodes) {
      mountPoint.removeChild(child)
    }

    m.mount(mountPoint, components.createLayout(application))

    unsubscribe = state.subscribe(s => m.redraw())

  }

  const unmount = () => {
    if (!mountPoint) {
      throw new Error("Application is not mounted")
    }

    m.mount(mountPoint, null)
    mountPoint = undefined
  }

  const reset = () => {
    state.set(initialState)
  }

  const destroy = () => {
    if (!destroyed) {
      unmount()
      unsubscribe?.()
      actions.destroy()
      destroyed = true
    }
  }

  return {...application, mount, unmount, reset, destroy}
}
