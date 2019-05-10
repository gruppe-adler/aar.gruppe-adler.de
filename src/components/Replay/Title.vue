<template>
    <div class="grad-replay__title">
        <md-button @click="back" class="md-icon-button md-dense md-white">
            <md-icon>arrow_back</md-icon>
        </md-button>
        <span><slot /></span>
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
    display: flex;
    align-items: center;
    grid-area: title;
    overflow: hidden;
    max-width: 100%;

    span {
        color: white;
        text-shadow: 1px 1px 10px rgba(0,0,0,0.9); 
        font-weight: bold;
        font-size: 2em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 10px;
    }
}
</style>
