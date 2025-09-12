import {deepMergeLeft} from '@welshman/lib'
import type {MakeOptional} from '@welshman/lib'
import IconLogin from './IconLogin.svg'
import IconRocket from './IconRocket.svg'
import type {LoginButtonAttrs} from './LoginButton'
import type {SignupButtonAttrs} from './SignupButton'
import {ApplicationError} from './error'

export type Nip55SignerApp = {
  name: string
  packageName: string
}

export type Nip07LoginPayload = {
  nip07: {
    pubkey: string
  }
}

export type Nip46LoginPayload = {
  nip46: {
    pubkey: string
  }
}

export type Nip55LoginPayload = {
  nip55: {
    pubkey: string
    signer: Nip55SignerApp
  }
}

export type LoginPayload = Nip07LoginPayload | Nip46LoginPayload | Nip55LoginPayload

export type ApplicationOptions = {
  history: History
  nip55SignerApps: Nip55SignerApp[]
  loginButtonAttrs: LoginButtonAttrs
  signupButtonAttrs: SignupButtonAttrs
  onLogin: (payload: LoginPayload) => void
  onError: (error: ApplicationError) => void
}

export type PartialApplicationOptions = MakeOptional<ApplicationOptions, 'history' | 'nip55SignerApps' | 'loginButtonAttrs' | 'signupButtonAttrs'>

export const defaultApplicationOptions = {
  history: window.history,
  nip55SignerApps: [],
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

export const createOptions = (options: PartialApplicationOptions) =>
  deepMergeLeft(options, defaultApplicationOptions) as ApplicationOptions
