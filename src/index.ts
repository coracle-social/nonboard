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
    render: (selector: Element) => {
      m.mount(selector, components.createLayout(application))

      const unsubscribe = state.subscribe(s => m.redraw())

      return () => {
        unsubscribe()
        actions.destroy()
        m.render(selector, null)
      }
    },
  }
}
