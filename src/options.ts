import {deepMergeLeft} from '@welshman/lib'
import type {SignedEvent} from '@welshman/util'
import type {Translations} from './translations'
import {defaultTranslations} from './translations'
import {ApplicationError} from './error'

export type Nip55SignerApp = {
  name: string
  packageName: string
}

export type Nip01Payload = {
  nip01: {
    pubkey: string
    secret: string
  }
}

export type Nip07Payload = {
  nip07: {
    pubkey: string
  }
}

export type Nip46Payload = {
  nip46: {
    pubkey: string
    clientSecret: string,
    signerPubkey: string,
    relays: string[],
  }
}

export type Nip55Payload = {
  nip55: {
    pubkey: string
    signer: Nip55SignerApp
  }
}

export type SignupPayload = Nip01Payload & {
  events: SignedEvent[]
}

export type LoginPayload = Nip07Payload | Nip46Payload | Nip55Payload

export type RequiredApplicationOptions = {
  appUrl: string
  appName: string
  appImage: string
  onSignup: (payload: SignupPayload) => void
  onLogin: (payload: LoginPayload) => void
  onError: (error: ApplicationError) => void
  onInfo: (message: string) => void
}

export type OptionalApplicationOptions = {
  history: History
  translations: Translations
  signerRelays: string[]
  indexerRelays: string[]
  defaultUserRelays: string[]
  blossomServers: string[]
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
  indexerRelays: [
    'wss://index.coracle.social/',
    'wss://relay.nostr.band/',
    'wss://purplepag.es/',
  ],
  defaultUserRelays: [
    'wss://relay.nos.social/',
    'wss://relay.damus.io/',
    'wss://offchain.pub/',
    'wss://nos.lol/',
  ],
  blossomServers: [
    'https://blossom.nostr.build',
    'https://cdn.satellite.earth',
    'https://blossom.primal.net',
  ],
  signerPermissions: "",
  nip55SignerApps: [],
}

export const createOptions = (options: PartialApplicationOptions) =>
  deepMergeLeft(options, defaultApplicationOptions) as ApplicationOptions
