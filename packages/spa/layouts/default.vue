<template>
  <v-app class="m-plus-rounded-1c">
    <v-toolbar color="primary" flat>
      <v-toolbar-title>
        <nuxt-link to="/" class="header-title">
          Nuxt.js Workshop
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-layout row>
      <v-flex xs3 md2>
        <v-navigation-drawer permanent>
          <v-list>
            <v-list-tile to="/" router exact>
              <v-list-tile-content>
                <v-list-tile-title>
                  TOP
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs9 md10>
        <nuxt />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="stylus">
.header-title
  color: white
  text-decoration: none
  outline: 0
</style>
