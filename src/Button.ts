import m from 'mithril'

export type ButtonAttrs = m.Attributes

export const Button: m.Component<ButtonAttrs> = {
  view(vnode) {
    return m('button.nb-button', vnode.attrs, vnode.children)
  }
}

