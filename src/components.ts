import {memoize} from '@welshman/lib'
import {createLoginButton} from './LoginButton'
import {createSignupButton} from './SignupButton'
import {createApplicationDefault} from './ApplicationDefault'

export type ApplicationComponents = {
  createLoginButton: typeof createLoginButton
  createSignupButton: typeof createSignupButton
  createApplicationDefault: typeof createApplicationDefault
}

export const createComponents = (): ApplicationComponents => {
  return {
    createLoginButton: memoize(createLoginButton),
    createSignupButton: memoize(createSignupButton),
    createApplicationDefault: memoize(createApplicationDefault),
  }
}
