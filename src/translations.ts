import IconArrowLeft from './IconArrowLeft.svg'
import IconArrowRight from './IconArrowRight.svg'
import IconCompass from './IconCompass.svg'
import IconCPU from './IconCPU.svg'
import IconLoading from './IconLoading.svg'
import IconLogin from './IconLogin.svg'
import IconQRCode from './IconQRCode.svg'
import IconRocket from './IconRocket.svg'
import IconWidget from './IconWidget.svg'

export type Translations = {
  [key: string]: string
}

export const defaultTranslations: Translations = {
  "landing.title": "Welcome to Nostr!",
  "landing.subtitle.prefix": "This app is built using the ",
  "landing.subtitle.link": "Nostr protocol",
  "landing.subtitle.suffix": ", which allows you to own your social identity.",
  "landing.login.icon": IconLogin,
  "landing.login.title": "Log in",
  "landing.login.subtitle": "If you've used Nostr before, you know the drill.",
  "landing.signup.icon": IconRocket,
  "landing.signup.title": "Create an account",
  "landing.signup.subtitle": "Just a few questions and you'll be on your way.",
  "login.title": "Log in with Nostr",
  "login.subtitle": "Choose the login method that works best for you.",
  "login.extension.button": "Log in with Extension",
  "login.signer.prefix": "Log in with",
  "login.extension.icon": IconWidget,
  "login.signer.button": "Log in with Remote Signer",
  "login.signer.icon": IconCPU,
  "login.browse.button": "Browse Signer Apps",
  "login.browse.icon": IconCompass,
  "login.back.button": "Go back",
  "login.back.icon": IconArrowLeft,
  "bunker.title": "Log in with a Signer",
  "bunker.subtitle": "Using a remote signer app helps you keep your keys safe.",
  "bunker.label": "Bunker Link*",
  "bunker.help": "A login link provided by a nostr signing app.",
  "bunker.qr.button": "Log in with a QR code instead",
  "bunker.connecting": "Establishing connection...",
  "bunker.scan.instructions": "Scan with your signer to log in, or click to copy.",
  "bunker.cpu.icon": IconCPU,
  "bunker.qr.icon": IconQRCode,
  "bunker.back.button": "Go back",
  "bunker.back.icon": IconArrowLeft,
  "bunker.next.button": "Next",
  "bunker.next.icon": IconArrowRight,
  "scanner.loading": "Loading your camera...",
  "card.arrow.icon": IconArrowRight,
  "loading.icon": IconLoading,
  "error.generic": "Something went wrong! Please try again.",
  "error.bunker.invalid": "Sorry, it looks like that's an invalid bunker link.",
  "error.bunker.signer.prefix": "Received error from signer:",
  "info.copied": "Copied to clipboard!",
}
