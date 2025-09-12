import {memoize} from '@welshman/lib'
import {createLayout} from './Layout'
import {createLanding} from './Landing'
import {createLogin} from './Login'
import {createSignup} from './Signup'
import {createLoginButton} from './LoginButton'
import {createSignupButton} from './SignupButton'

export type ApplicationComponents = {
  createLayout: typeof createLayout
  createLanding: typeof createLanding
  createLogin: typeof createLogin
  createSignup: typeof createSignup
  createLoginButton: typeof createLoginButton
  createSignupButton: typeof createSignupButton
}

export const createComponents = (): ApplicationComponents => {
  return {
    createLayout: memoize(createLayout),
    createLanding: memoize(createLanding),
    createLogin: memoize(createLogin),
    createSignup: memoize(createSignup),
    createLoginButton: memoize(createLoginButton),
    createSignupButton: memoize(createSignupButton),
  }
}
