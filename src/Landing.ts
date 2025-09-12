import m from 'mithril'
import type {Application} from './application'
import {Card} from './Card'

export const createLanding = (app: Application): m.Component => {
  const LoginButton = app.components.createLoginButton(app)
  const SignupButton = app.components.createSignupButton(app)

  return {
    view(vnode) {
      return m(Card, [
        m(LoginButton, {
          class: "nb-button-accent",
        }),
        m(SignupButton),
      ])
    }
  }
}
