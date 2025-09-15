import m from 'mithril'

export type TextAttrs = m.Attributes

export const Text: m.Component<TextAttrs> = {
  view(vnode) {
    return m('span.nb-text.nb-text-md', vnode.attrs, vnode.children)
  }
}

