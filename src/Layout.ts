import m from 'mithril'
import {makeSecret} from "@welshman/signer"
import type {Application} from './application'
import {View} from './view'

export const createLayout = (app: Application) => {
  const Landing = app.components.createLanding(app)
  const Login = app.components.createLogin(app)
  const LoginBunker = app.components.createLoginBunker(app)
  const SignupProfile = app.components.createSignupProfile(app)
  const SignupKey = app.components.createSignupKey(app)
  const SignupComplete = app.components.createSignupComplete(app)

  return (): m.Component => {
    const secret = makeSecret()

    return {
      view(vnode) {
        switch (app.state.get().view) {
          case View.Landing: return m(Landing)
          case View.Login: return m(Login)
          case View.LoginBunker: return m(LoginBunker)
          case View.SignupProfile: return m(SignupProfile)
          case View.SignupKey: return m(SignupKey, {secret})
          case View.SignupComplete: return m(SignupComplete, {secret})
        }
      }
    }
  }
}
