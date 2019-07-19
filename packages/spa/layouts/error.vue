<template>
  <v-content>
    <v-container>
      <h1>{{ error.statusCode }} {{ error.message }}</h1>
      <h2 v-if="error.statusCode == 404">
        お探しのページは見つかりませんでした。
      </h2>
      <h1 v-else>
        エラーが発生しました
      </h1>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export interface Error {
  statusCode: number
  message: string
}

export default Vue.extend({
  props: {
    error: Object as PropType<Error>,
  },
  head() {
    return {
      title: 'エラー',
    }
  },
})
</script>
