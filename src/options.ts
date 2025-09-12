import IconLogin from './IconLogin.svg'
import IconRocket from './IconRocket.svg'
import type {LoginButtonAttrs} from './LoginButton'
import type {SignupButtonAttrs} from './SignupButton'

export type ApplicationOptions = {
  loginButtonAttrs: LoginButtonAttrs
  signupButtonAttrs: SignupButtonAttrs
}

export type PartialApplicationOptions = {
  loginButtonAttrs?: Partial<LoginButtonAttrs>
  signupButtonAttrs?: Partial<SignupButtonAttrs>
}

export const defaultApplicationOptions: ApplicationOptions = {
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

export const applyDefaultOptions = (options: PartialApplicationOptions): ApplicationOptions => {
  options = {...options}

  for (const [k, defaults] of Object.entries(defaultApplicationOptions)) {
    const overrides = options[k as keyof ApplicationOptions] || {}

    options[k as keyof ApplicationOptions] = {...defaults, ...overrides}
  }

  return options as ApplicationOptions
}
