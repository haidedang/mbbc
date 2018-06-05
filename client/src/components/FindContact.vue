<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-layout justify-center>
          <v-card class=" test">

              <v-toolbar
                dense
              >
                <v-btn flat @click.native="dialog = false">
                  <i class="material-icons mx-1">
                    close
                  </i>
                </v-btn>
                <v-text-field prepend-icon="search" label="Contact ID" hide-details single-line></v-text-field>
              </v-toolbar>
            <div class="mt-0">
              <v-list>
                <template v-for="(item, index) in items">
                  <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                  <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                  <v-list-tile v-else :key="item.title" avatar @click="">
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </div>
          </v-card>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {bus} from '../main'
  export default {
    created () {
      var vm = this;
      bus.$on('dialog', function (value) {
        vm.dialog = value;
      })
    },
    data() {
      return {
        dialog: false,
        items2: [
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg',
            title: 'ContactID1',
            subtitle: "Maybe some Username or other Info"
          },
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg',
            title: 'ContactID2',
            subtitle: "Again some additional Info"
          },
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg',
            title: 'ContactID3',
            subtitle: "Additional Info"
          }
        ],
        items: [
          {header: 'Contacts'},
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg',
            title: 'ContactID1',
            subtitle: "Maybe some Username or other Info"
          },
          {divider: true, inset: true},
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg',
            title: 'ContactID2',
            subtitle: "Again some additional Info"
          },
          {divider: true, inset: true},
          {
            avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg',
            title: 'ContactID3',
            subtitle: "Additional Info"
          }
        ]
      }
    },
  }
</script>

<style scoped>
  .test{
    width: 100%;
  }

</style>
