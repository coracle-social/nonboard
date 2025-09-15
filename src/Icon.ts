import m from 'mithril'
import cx from 'classnames'
import IconLoading from './IconLoading.svg'

export interface IconAttrs {
  url: string
  showLoading?: boolean
}

export const Icon: m.Component<IconAttrs> = {
  view(vnode) {
    const {url, showLoading} = vnode.attrs
    const modifiedUrl = showLoading ? IconLoading : url

    return m('div', {
      class: cx('nb-icon', {'nb-spin': showLoading}),
      style: `mask-image: url("${modifiedUrl}");`,
    })
  }
}
