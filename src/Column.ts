import m from 'mithril'

export type ColumnAttrs = m.Attributes

export const Column: m.Component<ColumnAttrs> = {
  view(vnode) {
    return m('div.nb-column', vnode.attrs, vnode.children)
  }
}

