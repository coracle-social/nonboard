import m from 'mithril'
import type {Application} from './application'
import {CardButton} from './CardButton'

export type SignupButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createSignupButton = ({options}: Application): m.Component<Partial<SignupButtonAttrs>> => ({
  view(vnode) {
    return m(CardButton, {...vnode.attrs, ...options.signupButtonAttrs})
  }
})
