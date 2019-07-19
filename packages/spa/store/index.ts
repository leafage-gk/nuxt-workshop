import createLogger from 'vuex/dist/logger'
import {IndexState, RootGetters, IndexActions, RootActions} from '~/types/store'
import {ActionTree, RootActionContext} from '~/types/typed-vuex'
import {InjectedByPlugin} from '~/types/plugins'

export const state = (): IndexState => ({
  version: '1.0.0',
})

export const actions: ActionTree<
  RootActionContext<IndexState, RootGetters, never, RootActions>,
  IndexActions,
  InjectedByPlugin
> = {
  async nuxtClientInit() {},
}

const env = process.env.NODE_ENV || 'development'

export const plugins = env === 'development' ? [createLogger({})] : []
