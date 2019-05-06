<template>
    <div class="grad-replay__title">
        <md-button @click="back" class="md-icon-button md-dense md-white">
            <md-icon>arrow_back</md-icon>
        </md-button>
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TitleVue extends Vue {

    private back() {
        this.$router.push('/replays');
    }
}
</script>

<style lang="scss" scoped>
.grad-replay__title {
    margin: 10px;
    color: white;
    display: flex;
    align-items: center;
    font-size: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity .1s ease-in-out;    
}
</style>
