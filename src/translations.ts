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
  "landing.login.icon": IconLogin,
  "landing.login.title": "Log in",
  "landing.login.subtitle": "If you've used Nostr before, you know the drill.",
  "landing.signup.icon": IconRocket,
  "landing.signup.title": "Create an account",
  "landing.signup.subtitle": "Just a few questions and you'll be on your way.",
  "login.extension.icon": IconWidget,
  "login.signer.icon": IconCPU,
  "login.browse.icon": IconCompass,
  "login.back.icon": IconArrowLeft,
  "bunker.cpu.icon": IconCPU,
  "bunker.qr.icon": IconQRCode,
  "bunker.back.icon": IconArrowLeft,
  "bunker.next.icon": IconArrowRight,
  "card.arrow.icon": IconArrowRight,
  "loading.icon": IconLoading,
}
