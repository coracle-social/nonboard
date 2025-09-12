import m from 'mithril'
import IconArrowRight from './IconArrowRight.svg'
import {Icon} from './Icon'

export type ButtonCardAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const ButtonCard: m.Component<ButtonCardAttrs> = {
  view(vnode) {
    const {icon, title, subtitle, ...attrs} = vnode.attrs

    return m('button.nb-button.nb-button-card', attrs, [
      m('div.nb-button-card__before', m(Icon, {url: icon})),
      m('div.nb-button-card__content',
        m('div.nb-button-card__title', title),
        m('div.nb-button-card__subtitle', subtitle),
      ),
      m('div.nb-button-card__after', m(Icon, {url: IconArrowRight})),
    ])
  }
}

