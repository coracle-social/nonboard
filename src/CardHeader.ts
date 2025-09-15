import m from 'mithril'

export type CardHeaderAttrs = m.Attributes

export const CardHeader: m.Component<CardHeaderAttrs> = {
  view(vnode) {
    return m('div.nb-card__header', vnode.attrs, vnode.children)
  }
}

