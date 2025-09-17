import {memoize} from '@welshman/lib'
import {createLayout} from './Layout'
import {createLanding} from './Landing'
import {createLogin} from './Login'
import {createLoginBunker} from './LoginBunker'
import {createSignupProfile} from './SignupProfile'
import {createSignupKey} from './SignupKey'
import {createSignupComplete} from './SignupComplete'

export type ApplicationComponents = {
  createLayout: typeof createLayout
  createLanding: typeof createLanding
  createLogin: typeof createLogin
  createLoginBunker: typeof createLoginBunker
  createSignupProfile: typeof createSignupProfile
  createSignupKey: typeof createSignupKey
  createSignupComplete: typeof createSignupComplete
}

export const createComponents = (): ApplicationComponents => {
  return {
    createLayout: memoize(createLayout),
    createLanding: memoize(createLanding),
    createLogin: memoize(createLogin),
    createLoginBunker: memoize(createLoginBunker),
    createSignupProfile: memoize(createSignupProfile),
    createSignupKey: memoize(createSignupKey),
    createSignupComplete: memoize(createSignupComplete),
  }
}
