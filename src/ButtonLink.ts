import m from 'mithril'

export type ButtonLinkAttrs = m.Attributes

export const ButtonLink: m.Component<ButtonLinkAttrs> = {
  view(vnode) {
    return m('a.nb-button', vnode.attrs, vnode.children)
  }
}

