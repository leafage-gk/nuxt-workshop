import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import {Context} from '@nuxt/vue-app'

export default async (
  context: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject: (name: string, injected: any) => void
) => {
  context.$dispatch = context.store.dispatch
  context.$getters = context.store.getters

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }
  firebase.initializeApp(config)
  context.$firebase = firebase
  inject('firebase', firebase)

  await context.store.dispatch('nuxtClientInit', context)
  // await new Promise(resolve => {
  //   firebase.auth().onAuthStateChanged(async user => {
  //     await context.store.dispatch('auth/onAuthStateChanged', user)
  //     resolve()
  //   })
  // })
}
