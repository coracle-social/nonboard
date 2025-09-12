import IconLogin from './IconLogin.svg'
import IconRocket from './IconRocket.svg'
import type {LoginButtonAttrs} from './LoginButton'
import type {SignupButtonAttrs} from './SignupButton'

export type ApplicationOptions = {
  history: History
  loginButtonAttrs: LoginButtonAttrs
  signupButtonAttrs: SignupButtonAttrs
}

export type PartialApplicationOptions = {
  history?: History
  loginButtonAttrs?: Partial<LoginButtonAttrs>
  signupButtonAttrs?: Partial<SignupButtonAttrs>
}

export const defaultApplicationOptions: ApplicationOptions = {
  history: window.history,
  loginButtonAttrs: {
    icon: IconLogin,
    title: "Log in",
    subtitle: "If you've used Nostr before, you know the drill.",
  },
  signupButtonAttrs: {
    icon: IconRocket,
    title: "Create an account",
    subtitle: "If you've used Nostr before, you know the drill.",
  },
}

export const createOptions = (options: PartialApplicationOptions): ApplicationOptions => {
  const newOptions: any = {...options}

  for (const [k, defaults] of Object.entries(defaultApplicationOptions)) {
    const overrides = newOptions[k] || {}

    newOptions[k] = {...defaults, ...overrides}
  }

  return newOptions as ApplicationOptions
}
