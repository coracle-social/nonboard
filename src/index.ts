export * from './view'

import m from 'mithril'
import type {PartialApplicationOptions} from './options'
import {createOptions} from './options'
import {createState} from './state'
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

  return {
    ...application,
    render: (element: Element) => {
      for (const child of element.childNodes) {
        element.removeChild(child)
      }

      m.mount(element, components.createLayout(application))

      const unsubscribe = state.subscribe(s => m.redraw())

      return () => {
        unsubscribe()
        actions.destroy()
        m.mount(element, null)
      }
    },
  }
}
