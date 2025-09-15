mport m from 'mithril'
import type {Application} from './application'
import {Card} from './Card'

export const createApplicationDefault = (app: Application): m.Component => {
  const LoginButton = app.components.createLoginButton(app)
  const SignupButton = app.components.createSignupButton(app)

  return {
    view(vnode) {
      const {screen} = app.state.get()

      switch (screen) {
      }
      if (screen === ScreLayout) {
        return m(Card, [
          m(LoginButton, {
            class: "nb-button-primary",
          }),
          m(SignupButton),
        ])
      }
    }
  }
}
