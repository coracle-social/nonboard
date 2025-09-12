import m from 'mithril'
import type {Application} from './application'
import {ButtonCard} from './ButtonCard'

export type SignupButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createSignupButton = ({options}: Application): m.Component<Partial<SignupButtonAttrs>> => ({
  view(vnode) {
    return m(ButtonCard, {...vnode.attrs, ...options.signupButtonAttrs})
  }
})
