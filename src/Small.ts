import m from 'mithril'

export type SmallAttrs = m.Attributes

export const Small: m.Component<SmallAttrs> = {
  view(vnode) {
    return m('span.nb-small', vnode.attrs, vnode.children)
  }
}

