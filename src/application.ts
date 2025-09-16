import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
import type {ApplicationActions} from './actions'
import type {ApplicationComponents} from './components'
import type {Translations} from './translations'

export type PartialApplication = {
  options: ApplicationOptions
  state: ApplicationState
  actions: ApplicationActions
  components: ApplicationComponents
}

export type Application = PartialApplication & {
  tr: (key: keyof Translations) => string
}

export const createApplication = (application: PartialApplication): Application => {
  const tr = (key: keyof Translations) => application.options.translations[key]

  return {...application, tr}
}
