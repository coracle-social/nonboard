import m from 'mithril'
import type {Application} from './application'
import {Screen} from './screen'
import {CardButton} from './CardButton'

export type LoginButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createLoginButton = ({options, actions}: Application): m.Component<Partial<LoginButtonAttrs>> => ({
  view(vnode) {
    return m(CardButton, {...vnode.attrs, ...options.loginButtonAttrs, onclick: () => actions.goto(Screen.Login)})
  }
})
