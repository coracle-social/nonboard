import m from 'mithril'

export interface CounterAttrs {
  initialValue?: number
}

export interface CounterState {
  count: number
}

export const Counter: m.Component<CounterAttrs, CounterState> = {
  oninit(vnode) {
    vnode.state.count = vnode.attrs.initialValue || 0
  },
  
  view(vnode) {
    return m('div.card',
      m('button', {
        onclick: () => {
          vnode.state.count++
        }
      }, `count is ${vnode.state.count}`)
    )
  }
}