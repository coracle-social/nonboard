import m from 'mithril'
import type {Application} from './application'
import {View} from './view'
import {ButtonCard} from './ButtonCard'

export type LoginButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createLoginButton = ({options, actions}: Application): m.Component<Partial<LoginButtonAttrs>> => ({
  view(vnode) {
    return m(ButtonCard, {...vnode.attrs, ...options.loginButtonAttrs, onclick: () => actions.goto(View.Login)})
  }
})
