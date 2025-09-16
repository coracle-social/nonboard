import {memoize} from '@welshman/lib'
import {createLayout} from './Layout'
import {createLanding} from './Landing'
import {createLogin} from './Login'
import {createLoginBunker} from './LoginBunker'
import {createSignup} from './Signup'

export type ApplicationComponents = {
  createLayout: typeof createLayout
  createLanding: typeof createLanding
  createLogin: typeof createLogin
  createLoginBunker: typeof createLoginBunker
  createSignup: typeof createSignup
}

export const createComponents = (): ApplicationComponents => {
  return {
    createLayout: memoize(createLayout),
    createLanding: memoize(createLanding),
    createLogin: memoize(createLogin),
    createLoginBunker: memoize(createLoginBunker),
    createSignup: memoize(createSignup),
  }
}
