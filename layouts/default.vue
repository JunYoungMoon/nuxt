<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-img src="~/assets/logo.png" height="40" />
      </v-toolbar-title>

      <v-spacer />

      <v-menu offset-y open-on-hover>
        <template #activator="{ on }">
          <v-btn v-on="on">
            Market
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in marketItems" :key="index" :href="item.link">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y open-on-hover>
        <template #activator="{ on }">
          <v-btn v-on="on">
            Artist
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in artistItems" :key="index" :href="item.link">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y open-on-hover>
        <template #activator="{ on }">
          <v-btn v-on="on">
            Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in createItems" :key="index" :href="item.link">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="toggleTheme">
        <i :class="iconClass" style="font-size: 30px;" />
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <!-- 콘텐츠 내용을 여기에 추가합니다. -->
      </v-container>
    </v-content>
    <v-footer app />
    <!--
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    async asyncData ({ store, app }) {
        await store.dispatch('nuxtServerInit', { app })
    },
    data () {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            marketItems: [
                { text: 'Music', link: '/market/music' },
                { text: 'Resale', link: '/market/resale' }
            ],
            artistItems: [
                { text: 'My Profile', link: '/artist/profile' },
                { text: 'My Songs', link: '/artist/songs' },
                { text: 'My Albums', link: '/artist/albums' }
            ],
            createItems: [
                { text: 'New Song', link: '/create/song' },
                { text: 'New Album', link: '/create/album' }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
            isDark: true
        }
    },
    computed: {
        iconClass () {
            return this.$vuetify.theme.dark ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
        }
    },
    created () {
        this.$vuetify.theme.dark = this.$store.state.isDark
    },

    methods: {
        toggleTheme () {
            const isDark = !this.$vuetify.theme.dark
            this.$vuetify.theme.dark = isDark
            this.$store.commit('setTheme', isDark, { root: true })
            document.cookie = `theme=${isDark ? 'dark' : 'light'}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
        },
        onClick (item) {
        // 아이템 클릭 시 발생할 이벤트를 처리합니다.
        }
    }
}
</script>
