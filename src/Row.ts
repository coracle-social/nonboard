import m from 'mithril'

export type RowAttrs = m.Attributes

export const Row: m.Component<RowAttrs> = {
  view(vnode) {
    return m('div.nb-row', vnode.attrs, vnode.children)
  }
}

