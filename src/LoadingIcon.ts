import m from 'mithril'
import cx from 'classnames'
import {Icon} from './Icon'

export interface LoadingIconAttrs {
  url: string
  spin?: boolean
}

export const LoadingIcon: m.Component<LoadingIconAttrs> = {
  view(vnode) {
    return m('div', 
      class: cx('nb-icon', {'nb-spin': vnode.attrs.spin}),
      style: `mask-image: url("${vnode.attrs.url}");`,
    })
  }
}

            loading === 'nip07'
              ? m(Icon, {url: IconLoading, spin: true})
              : m(Icon, {url: IconWidget}),
