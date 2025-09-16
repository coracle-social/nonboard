import m from 'mithril'

export type LabelAttrs = m.Attributes

export const Label: m.Component<LabelAttrs> = {
  view(vnode) {
    return m('div.nb-label', vnode.attrs, vnode.children)
  }
}

