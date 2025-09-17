import m from 'mithril'

export type AlertAttrs = m.Attributes

export const Alert: m.Component<AlertAttrs> = {
  view(vnode) {
    return m('span.nb-alert', vnode.attrs, vnode.children)
  }
}

