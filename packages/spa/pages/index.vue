<template>
  <v-content>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              プロフィール
            </v-card-title>
            <v-list two-line>
              <template v-for="item in items">
                <v-list-tile :key="item.name">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <nuxt-link :to="item.to">{{ item.name }}</nuxt-link>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      items: [
        {
          name: 'aoyama',
          to: '/profile/aoyama',
        },
        {
          name: 'ikeda',
          to: '/profile/ikeda',
        },
        {
          name: 'ise',
          to: '/profile/ise',
        },
        {
          name: 'katsuta',
          to: '/profile/katsuta',
        },
        {
          name: 'koike',
          to: '/profile/koike',
        },
        {
          name: 'sugimoto',
          to: '/profile/sugimoto',
        },
      ],
    }
  },
})
</script>
