<template>
    <div class="grad-controls grad--group">
        <i v-if="!isPlaying" @click="play" class="material-icons">play_arrow</i>
        <i v-else @click="pause" class="material-icons">pause</i>
        <input type="range" min="1" :max="max" v-model="frame">
        <span>{{frame}}/{{max}}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ControlsVue extends Vue {
    @Prop({ default: 100 }) private max?: number;
    @Prop({ default: 0, type: Number }) private value?: number;

    private isPlaying: boolean = false;
    private interval?: number;
    private playbackSpeedFactor: number = 10;

    private mounted() {
        window.addEventListener('keyup', this.onKeyUp);
    }

    private beforeDestory() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * v-model helper setter / getter
     */
    private set frame(val: number) { this.$emit('input', val); }
    private get frame(): number { return this.value!; }

    /**
     * KeyUp event listener callback
     * @param {KeyboardEvent} event Keyboard Event
     */
    private onKeyUp(event: KeyboardEvent) {

        // play / pause on space bar
        if (event.keyCode === 32) {
            if (this.isPlaying) {
                return this.pause();
            } else {
                return this.play();
            }
        }
    }

    /**
     * Play playback.
     */
    private play() {
        this.isPlaying = true;

        // if playback is done start from the beginning
        if (this.frame === this.max) this.frame = 0;


        this.interval = window.setInterval(() => {
            this.frame!++;

            if (this.frame! >= this.max!) {
                this.frame = this.max!;
                this.pause();
            }
        }, (1000 / this.playbackSpeedFactor));
    }

    /**
     * Pause playback.
     */
    private pause() {
        this.isPlaying = false;

        window.clearInterval(this.interval);
    }
}
</script>
<style lang="scss" scoped>
.grad-controls {
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;

    i {
        cursor: pointer;
        font-size: 30px;
        user-select: none;
    }

    input[type=range] {
        width: 100%;
        -webkit-appearance: none;
        margin: 5.5px 0;
        outline: none;
        margin: 0px 10px;

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: rgba(#66AA66, 0.5);
            border-radius: 2px;
        }
        &::-webkit-slider-thumb {
            height: 15px;
            width: 15px;
            border-radius: 15px;
            background: #66aa66;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -5.5px;
        }

        &::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            border-radius: 1px;
        }
        &::-moz-range-thumb {
            height: 15px;
            width: 15px;
            border-radius: 15px;
            background: #66aa66;
            cursor: pointer;
        }
    }

    span {
        min-width: 60px;
        text-align: right;
    }
}
</style>
