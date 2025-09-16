import m from 'mithril'
import type {Application} from './application'
import {View} from './view'

export const createLayout = (app: Application): m.Component => {
  const Landing = app.components.createLanding(app)
  const Login = app.components.createLogin(app)
  const LoginBunker = app.components.createLoginBunker(app)
  const Signup = app.components.createSignup(app)
  const SignupProfile = app.components.createSignupProfile(app)
  const SignupKey = app.components.createSignupKey(app)

  return {
    view(vnode) {
      switch (app.state.get().view) {
        case View.Landing: return m(Landing)
        case View.Login: return m(Login)
        case View.LoginBunker: return m(LoginBunker)
        case View.Signup: return m(Signup)
        case View.SignupProfile: return m(SignupProfile)
        case View.SignupKey: return m(SignupKey)
      }
    }
  }
}
