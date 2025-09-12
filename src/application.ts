import type {ApplicationOptions} from './options'
import type {ApplicationState} from './state'
import type {ApplicationActions} from './actions'
import type {ApplicationComponents} from './components'

export type Application = {
  options: ApplicationOptions
  state: ApplicationState
  actions: ApplicationActions
  components: ApplicationComponents
}

export const createApplication = (application: Application): Application => application
