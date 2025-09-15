import m from 'mithril'
import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
import {Screen} from './screen'
import {CardButton} from './CardButton'

export type LoginButtonAttrs = m.Attributes & {
  icon: string
  title: string
  subtitle: string
}

export const createLoginButton = (options: ApplicationOptions, state: ApplicationState): m.Component<Partial<LoginButtonAttrs>> => ({
  view(vnode) {
    return m(CardButton, {...vnode.attrs, ...options.loginButtonAttrs, onclick: () => state.screen.set(Screen.Login)})
  }
})

      m.render(selector, [
        m(Card, [
          m(LoginButton, {
            class: "nb-button-primary",
          }),
          m(SignupButton),
        ])
      ])
