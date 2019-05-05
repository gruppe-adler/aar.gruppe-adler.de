<template>
    <div class="grad-replay__title">
        <i @click="back" class="material-icons">arrow_back</i>
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TitleVue extends Vue {

    private back() {
        alert('meh');
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
    opacity: 0.4;
    transition: opacity .1s ease-in-out;

    i {
        opacity: 0.5;
        font-size: 1em;
        cursor: pointer;
        margin-right: 20px;
        transition: opacity .1s ease-in-out;

        &:hover {
            opacity: 0.9;
        }
    }

    &:hover {
        opacity: 1;
    }
    
}
</style>
