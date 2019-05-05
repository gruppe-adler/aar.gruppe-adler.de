<template>
    <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
html, body, #app {
    color: #444;
    font-family: 'Source Sans Pro', sans-serif;
    height: 100%;
    margin: 0;
}
</style>
