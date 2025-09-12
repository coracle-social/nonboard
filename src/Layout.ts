import m from 'mithril'
import type {Application} from './application'
import {View} from './view'

export const createLayout = (app: Application): m.Component => {
  const Landing = app.components.createLanding(app)
  const Login = app.components.createLogin(app)

  return {
    view(vnode) {
      const {view} = app.state.get()
      console.log(view)

      switch (view) {
        case View.Landing: return m(Landing)
        case View.Login: return m(Login)
        case View.Signup: return m('div', 'signup')
      }
    }
  }
}
