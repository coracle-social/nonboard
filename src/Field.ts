import m from 'mithril'

export type FieldAttrs = m.Attributes

export const Field: m.Component<FieldAttrs> = {
  view(vnode) {
    return m('div.nb-field', vnode.attrs, vnode.children)
  }
}

