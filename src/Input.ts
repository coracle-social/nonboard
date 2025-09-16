import m from 'mithril'

export type InputAttrs = m.Attributes

export const Input: m.Component<InputAttrs> = {
  view(vnode) {
    return m('input.nb-input', vnode.attrs)
  }
}

