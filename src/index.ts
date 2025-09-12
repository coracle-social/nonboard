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

  const render = <A, S>(selector: Element, component: m.Component<A, S>) => {
    m.render(selector, m(component))

    const unsubscribe = state.subscribe(() => m.redraw())

    return () => {
      unsubscribe()
      actions.destroy()
      m.render(selector, null)
    }
  }

  return {
    renderDefault: (selector: Element) => render(selector, components.createApplicationDefault(application))
  }
}
