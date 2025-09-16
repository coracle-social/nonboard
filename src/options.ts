import {deepMergeLeft} from '@welshman/lib'
import type {LoginButtonAttrs} from './LoginButton'
import type {SignupButtonAttrs} from './SignupButton'
import type {Translations} from './translations'
import {defaultTranslations} from './translations'
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
    clientSecret: string,
    signerPubkey: string,
    relays: string[],
  }
}

export type Nip55LoginPayload = {
  nip55: {
    pubkey: string
    signer: Nip55SignerApp
  }
}

export type LoginPayload = Nip07LoginPayload | Nip46LoginPayload | Nip55LoginPayload

export type RequiredApplicationOptions = {
  appUrl: string
  appName: string
  appImage: string
  onLogin: (payload: LoginPayload) => void
  onError: (error: ApplicationError) => void
  onInfo: (message: string) => void
}

export type OptionalApplicationOptions = {
  history: History
  translations: Translations
  signerRelays: string[]
  signerPermissions: string
  nip55SignerApps: Nip55SignerApp[]
}

export type ApplicationOptions = RequiredApplicationOptions & OptionalApplicationOptions

export type PartialApplicationOptions = RequiredApplicationOptions & Partial<OptionalApplicationOptions>

export const defaultApplicationOptions = {
  history: window.history,
  translations: defaultTranslations,
  signerRelays: [
    'wss://relay.nos.social/',
    'wss://relay.nsec.app/',
    'wss://offchain.pub/',
  ],
  signerPermissions: "",
  nip55SignerApps: [],
}

export const createOptions = (options: PartialApplicationOptions) =>
  deepMergeLeft(options, defaultApplicationOptions) as ApplicationOptions
