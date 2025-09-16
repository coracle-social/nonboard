import m from 'mithril'

export type CardFooterAttrs = m.Attributes

export const CardFooter: m.Component<CardFooterAttrs> = {
  view(vnode) {
    return m('div.nb-card__footer', vnode.attrs, vnode.children)
  }
}

