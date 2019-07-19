import Vue from 'vue'
import {InjectedByPlugin} from '../plugins'
import {RootDispatch} from '../typed-vuex'
import {RootActions, RootGetters} from '../store'

declare module '@nuxt/vue-app' {
  interface Context extends InjectedByPlugin {
    $getters: RootGetters
    $dispatch: RootDispatch<RootActions>
  }
}

declare module 'vue/types/vue' {
  interface Vue extends InjectedByPlugin {}
}
