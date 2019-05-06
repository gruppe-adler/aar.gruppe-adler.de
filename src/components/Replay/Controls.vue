<template>
    <div class="grad-controls grad--group">
        <md-button @click="isPlaying ? pause() : play()" class="md-icon-button md-dense">
            <md-icon v-if="isPlaying">pause</md-icon>
            <md-icon v-else-if="frame === max">replay</md-icon>
            <md-icon v-else>play_arrow</md-icon>
        </md-button>
        <!-- <i v-if="!" @click="play" class="material-icons">play_arrow</i>
        <i v-else @click="pause" class="material-icons">pause</i> -->
        <input type="range" min="1" :max="max" v-model="frame">

        <md-menu md-direction="top-start" :mdCloseOnClick="true" :mdCloseOnSelect="true" md-size="small">
            <div md-menu-trigger style="display: flex; align-items: center;">
                <md-button class="md-icon-button" >
                    <md-icon>slow_motion_video</md-icon>
                </md-button>
            </div>
            <md-menu-content>
                
                <md-menu-item
                    v-for="i in [16,8,4,2,1]"
                    :key="i"
                >
                    <md-radio v-model="playbackSpeedFactor" :value="i" />
                    <span class="md-list-item-text">{{i}}x</span>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
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
    private playbackSpeedFactor: number = 1;

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

        if (this.frame === this.max) {
            // if playback is done start from the beginning
            this.frame = 1;
        } else {
            // instantly jump to next frame so that user has direct feedback
            this.frame++;
        }

        this.interval = window.setInterval(() => {
            this.frame++;

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

    @Watch('playbackSpeedFactor')
    private onSpeedChange() {
        if (!this.isPlaying) return;

        this.pause();
        this.play();
    }
}
</script>
<style lang="scss" scoped>
.grad-controls {
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;

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
            background: rgba(#D18D1F, 0.5);
            border-radius: 2px;
        }
        &::-webkit-slider-thumb {
            height: 15px;
            width: 15px;
            border-radius: 15px;
            background: #D18D1F;
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
            background: #D18D1F;
            cursor: pointer;
        }
    }

    > span {
        min-width: 60px;
        text-align: right;
    }
}
</style>
