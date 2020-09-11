<template>
<v-app id="inspire">
    <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
    >
        <v-toolbar-title
            style="width: 300px"
            class="ml-0 pl-4"
        >
            <span class="">Lotto</span>
        </v-toolbar-title>
    </v-app-bar>
    <!-- 컨텐츠 영역 -->
    <v-content>
        <slot></slot>
    </v-content>
</v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    components:{
    },
    props: {
    },
    data(){
      return {
        items: [
            { icon: 'mdi-contacts', text: 'Dashboard', name: 'Dashboard' },
        //   { icon: 'mdi-content-copy', text: 'Duplicates' },
        //   {
        //     icon: 'mdi-chevron-up',
        //     'icon-alt': 'mdi-chevron-down',
        //     text: 'Labels',
        //     model: true,
        //     children: [
        //       { icon: 'mdi-plus', text: 'Create label' },
        //     ],
        //   },
        //   {
        //     icon: 'mdi-chevron-up',
        //     'icon-alt': 'mdi-chevron-down',
        //     text: 'More',
        //     model: false,
        //     children: [
        //       { text: 'Import' },
        //       { text: 'Export' },
        //       { text: 'Print' },
        //       { text: 'Undo changes' },
        //       { text: 'Other contacts' },
        //     ],
        //   },
        //   { icon: 'mdi-settings', text: 'Settings' },
        //   { icon: 'mdi-message', text: 'Send feedback' },
        //   { icon: 'mdi-help-circle', text: 'Help' },
        //   { icon: 'mdi-cellphone-link', text: 'App downloads' },
        //   { icon: 'mdi-keyboard', text: 'Go to the old version' },
        ],
      }
    },
    methods: {
    },
  }
</script>
