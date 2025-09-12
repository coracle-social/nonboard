import m from 'mithril'
import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
import {CardButton} from './CardButton'

export type SignupButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createSignupButton = (options: ApplicationOptions, state: ApplicationState): m.Component<Partial<SignupButtonAttrs>> => ({
  view(vnode) {
    return m(CardButton, {...vnode.attrs, ...options.signupButtonAttrs})
  }
})
