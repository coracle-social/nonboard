import m from 'mithril'

export type SubtitleAttrs = m.Attributes

export const Subtitle: m.Component<SubtitleAttrs> = {
  view(vnode) {
    return m('span.nb-subtitle', vnode.attrs, vnode.children)
  }
}

