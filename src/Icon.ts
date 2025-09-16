import m from 'mithril'
import cx from 'classnames'
import IconLoading from './IconLoading.svg'

export type IconAttrs = {
  url?: string
  loading?: boolean
  onclick?: (event: Event) => void
}

export const Icon: m.Component<IconAttrs> = {
  view(vnode) {
    const {url, loading, ...attrs} = vnode.attrs
    const modifiedUrl = loading ? IconLoading : url

    return m('div', {
      ...attrs,
      class: cx('nb-icon', {
        'nb-spin': loading,
        'nb-icon--clickable': attrs.onclick,
      }),
      style: `mask-image: url("${modifiedUrl}");`,
    })
  }
}
