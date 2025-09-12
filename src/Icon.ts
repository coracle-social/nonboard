import m from 'mithril'

export interface IconAttrs {
  url: string
}

export const Icon: m.Component<IconAttrs> = {
  view(vnode) {
    return m('div.nb-icon', {style: `mask-image: url("${vnode.attrs.url}");`})
  }
}
