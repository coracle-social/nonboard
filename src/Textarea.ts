import m from 'mithril'

export type TextareaAttrs = m.Attributes

export const Textarea: m.Component<TextareaAttrs> = {
  view(vnode) {
    return m('textarea.nb-textarea', vnode.attrs)
  }
}