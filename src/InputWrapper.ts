import m from 'mithril'
import cx from 'classnames'

export type InputWrapperAttrs = m.Attributes & {
  before?: string | m.Vnode
  after?: string | m.Vnode
}

export const InputWrapper: m.Component<InputWrapperAttrs> = {
  view(vnode) {
    const {before, after, ...attrs} = vnode.attrs

    return m('div.nb-input-wrapper', {
      ...attrs,
      class: cx(attrs.class, {
        'nb-input-wrapper--before': before,
        'nb-input-wrapper--after': after,
      })
    }, [
      before && m('div.nb-input-wrapper__before', before),
      m('div.nb-input-wrapper__content', vnode.children),
      after && m('div.nb-input-wrapper__after', after),
    ])
  }
}

