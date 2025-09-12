import m from 'mithril'
import cx from 'classnames'

export interface IconAttrs {
  url: string
  spin?: boolean
}

export const Icon: m.Component<IconAttrs> = {
  view(vnode) {
    return m('div', {
      class: cx('nb-icon', {'nb-spin': vnode.attrs.spin}),
      style: `mask-image: url("${vnode.attrs.url}");`,
    })
  }
}
