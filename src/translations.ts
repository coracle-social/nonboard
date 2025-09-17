import IconArrowDown from './IconArrowDown.svg'
import IconArrowLeft from './IconArrowLeft.svg'
import IconArrowRight from './IconArrowRight.svg'
import IconCompass from './IconCompass.svg'
import IconCPU from './IconCPU.svg'
import IconKey from './IconKey.svg'
import IconLoading from './IconLoading.svg'
import IconLogin from './IconLogin.svg'
import IconQRCode from './IconQRCode.svg'
import IconRocket from './IconRocket.svg'
import IconUser from './IconUser.svg'
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
  "signup.profile.title": "Create your Profile",
  "signup.profile.subtitle": "Give people something to go on — but remember, privacy matters! Be careful about sharing sensitive information.",
  "signup.profile.avatar.label": "Upload an avatar",
  "signup.profile.name.icon": IconUser,
  "signup.profile.name.label": "Nickname",
  "signup.profile.name.help": "What would you like people to call you?",
  "signup.profile.about.label": "About You",
  "signup.profile.about.help": "Give a brief introduction to why you're here.",
  "signup.profile.submit.button": "Create Account",
  "signup.profile.back.button": "Go back",
  "signup.profile.back.icon": IconArrowLeft,
  "signup.profile.submit.icon": IconArrowRight,
  "signup.key.title": "Generate a key",
  "signup.key.subtitle": "Take control of your digital identity by generating a cryptographic key pair.",
  "signup.key.info": "Securing your key pair is important! Take the time to save your key in a secure place (like a password manager).",
  'signup.key.password.label': "Password*",
  "signup.key.password.icon": IconKey,
  "signup.key.password.help": "Passwords should be at least 12 characters long. Write this down!",
  'signup.key.download.text': "Download my key",
  'signup.key.download.icon': IconArrowDown,
  'signup.key.togglePassword.on': "Nevermind, I want to download the plain version",
  'signup.key.togglePassword.off': "I want to download an encrypted version",
  'signup.key.back.icon': IconArrowLeft,
  'signup.key.back.text': "Go back",
  'signup.key.next.icon': IconArrowRight,
  'signup.key.next.text': "Continue",
  'signup.complete.title': "You're all set!",
  'signup.complete.subtitle': "You've created your profile and saved your keys — that's all it takes to get on Nostr.",
  'signup.complete.next.text': "Publish my Profile!",
  "bunker.title": "Log in with a Signer",
  "bunker.subtitle": "Using a remote signer app helps you keep your keys safe.",
  "bunker.label": "Bunker Link*",
  "bunker.help": "A login link provided by a nostr signing app.",
  "bunker.qr.button": "Log in with a QR code instead",
  "bunker.connecting": "Establishing connection...",
  "bunker.scan.instructions": "Scan with your signer to log in, or click to copy.",
  "bunker.cpu.icon": IconCPU,
  "bunker.qr.icon": IconQRCode,
  "bunker.back.text": "Go back",
  "bunker.back.icon": IconArrowLeft,
  "bunker.next.text": "Next",
  "bunker.next.icon": IconArrowRight,
  "scanner.loading": "Loading your camera...",
  "card.arrow.icon": IconArrowRight,
  "loading.icon": IconLoading,
  "error.generic": "Something went wrong! Please try again.",
  "error.bunker.invalid": "Sorry, it looks like that's an invalid bunker link.",
  "error.bunker.signer.prefix": "Received error from signer:",
  "info.copied": "Copied to clipboard!",
}
