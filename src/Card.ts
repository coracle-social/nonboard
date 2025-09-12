import m from 'mithril'

export type CardAttrs = m.Attributes

export const Card: m.Component<CardAttrs> = {
  view(vnode) {
    return m('div.nb-card', vnode.attrs, vnode.children)
  }
}

