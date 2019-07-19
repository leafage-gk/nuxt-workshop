import Vue from 'vue'
import moment from 'moment'
import {Context} from '@nuxt/vue-app'

export default (context: Context) => {
  Vue.filter(
    'dateFormat',
    (val: string | number | Date | moment.Moment, format: string): string => {
      return context.$moment(val).format(format)
    }
  )
}
