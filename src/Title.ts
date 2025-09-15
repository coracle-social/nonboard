import m from 'mithril'

export type TitleAttrs = m.Attributes

export const Title: m.Component<TitleAttrs> = {
  view(vnode) {
    return m('span.nb-title', vnode.attrs, vnode.children)
  }
}

