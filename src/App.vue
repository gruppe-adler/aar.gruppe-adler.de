<template>
    <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #D18D1F, // The primary color of your brand
  accent: #66AA66, // The secondary color of your brand
  white: white
));

@import "~vue-material/dist/theme/all";


html, body, #app {
    color: #444;
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
}
</style>
