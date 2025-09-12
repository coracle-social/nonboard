import m from 'mithril'
import type {PartialApplicationOptions} from './options'
import {applyDefaultOptions} from './options'
import {createApplicationState} from './state'
import {Card} from './Card'
import {createLoginButton} from './LoginButton'
import {createSignupButton} from './SignupButton'

export default (partialOptions: PartialApplicationOptions) => {
  const options = applyDefaultOptions(partialOptions)
  const state = createApplicationState(options)
  const LoginButton = createLoginButton(options, state)
  const SignupButton = createSignupButton(options, state)

  return {
    renderDefault(selector: Element) {
      m.render(selector, [
        m(Card, [
          m(LoginButton, {
            class: "nb-button-accent",
          }),
          m(SignupButton),
        ])
      ])

      return () => m.render(selector, null)
    },
  }
}
