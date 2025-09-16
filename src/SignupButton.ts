import m from 'mithril'
import type {Application} from './application'
import {View} from './view'
import {ButtonCard} from './ButtonCard'

export type SignupButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createSignupButton = ({actions, options}: Application): m.Component<Partial<SignupButtonAttrs>> => ({
  view(vnode) {
    return m(ButtonCard, {...vnode.attrs, ...options.signupButtonAttrs, onclick: () => actions.goto(View.Signup)})
  }
})
