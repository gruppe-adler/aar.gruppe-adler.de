<template>
    <div class="grad-replay">
        <Map :worldName="replay.worldName" :callback="mapCallback" />
        <div class="grad-replay__top">
            <Title>{{replay.missionName}} - {{replay.date}}</Title>
            <CoordsDisplay v-if="coords" :coords="coords" />
        </div>
        <Controls :max="200" v-model="frame" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Map, LeafletMouseEvent, LeafletEvent, LatLng } from 'leaflet';

import MapVue from '@/components/Replay/Map.vue';
import CoordsDisplayVue from '@/components/Replay/CoordsDisplay.vue';
import ControlsVue from '@/components/Replay/Controls.vue';
import TitleVue from '@/components/Replay/Title.vue';
import { Replay } from '../models';

@Component({
    components: { Map: MapVue, Controls: ControlsVue, CoordsDisplay: CoordsDisplayVue, Title: TitleVue }
})
export default class ReplayVue extends Vue {
    private replay: Replay = {
        id: 1,
        missionName: 'Breaking Contact',
        date: new Date(),
        duration: 0,
        worldName: 'stratis'
    };
    private map?: Map;
    private frame: number = 1;
    private coords?: LatLng|null = null;

    private mounted() {
        if (this.$route.query.frame) {
            this.frame = parseInt(this.$route.query.frame as string, 10);
        }
    }

    private mapCallback(map: Map) {
        this.map = map;

        map.on('mousemove', (event: LeafletEvent) => this.coords = (event as LeafletMouseEvent).latlng);
    }

    @Watch('frame')
    private valueChanged() {
        this.$router.push({ query: { frame: this.frame.toString() }});
    }
}
</script>

<style lang="scss">
.grad--group {
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    margin: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
}

.grad-replay__top {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>
