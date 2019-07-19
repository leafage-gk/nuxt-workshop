import {Context} from '@nuxt/vue-app'
import {Action, MapActions, MapGetters} from '~/types/typed-vuex'

export interface IndexState {
  version: string
}

export interface IndexGetters {}

type NuxtClientInitAction = Action<
  'nuxtClientInit',
  'nuxtClientInit',
  Promise<void>,
  Context
>
export type IndexActions = NuxtClientInitAction

export interface RootGetters extends IndexGetters {}

export type RootActions = IndexActions

export interface ActionsMap {}

export interface GettersMap {}

declare module 'vuex/types/index' {
  export const mapActions: MapActions<ActionsMap, IndexActions>
  export const mapGetters: MapGetters<GettersMap, IndexGetters>
}
