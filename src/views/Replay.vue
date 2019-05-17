<template>
    <div class="grad-replay">
        <Map v-if="replay" :worldName="replay.worldName" :callback="mapCallback">
            <template v-slot="{ map, metaData, layer, selectBasemap }">
                <Layers :metaData="metaData" v-model="layer" :select="selectBasemap" />
                <CoordsDisplay :map="map" :metaData="metaData" />
                <Locations :map="map" :metaData="metaData" />
                <Title>{{replay.missionName}} ({{date}})</Title>
            </template>
        </Map>
        <Controls v-if="replay && replay.data" :max="replay.data.replay.length - 1" :time="replay.data.replay[frame].time" v-model="frame" />
        <div v-if="loading" class="grad-replay__loading">
            <md-progress-spinner :md-diameter="100" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-if="!loading && !replay" class="grad-replay__error">
            Replay konnte nicht geladen werden. <br/> Klicke hier um es erneut zu probieren:
            <md-button @click="load" class="md-icon-button md-primary">
                <md-icon>refresh</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Map, LeafletMouseEvent, LeafletEvent, LatLng, LayerGroup, Polyline } from 'leaflet';

import MapVue from '@/components/Replay/Map.vue';
import CoordsDisplayVue from '@/components/Replay/CoordsDisplay.vue';
import ControlsVue from '@/components/Replay/Controls.vue';
import TitleVue from '@/components/Replay/Title.vue';
import LayersVue from '@/components/Replay/Layers.vue';
import { Replay, UnitMarker, ReplayRecord, ReplayFrame } from '../models';
import LocationsVue from '@/components/Replay/Locations.vue';
import { fetchReplay } from '../ApiUtils';
import { armaToLatLng } from '../MapUtils';

@Component({
    components: {
        Map: MapVue,
        Layers: LayersVue,
        Controls: ControlsVue,
        CoordsDisplay: CoordsDisplayVue,
        Title: TitleVue,
        Locations: LocationsVue
    }
})
export default class ReplayVue extends Vue {
    @Prop() private id?: number;
    private replay: Replay|null = null;
    private frame: number = 1;
    private loading: boolean = true;
    private drawnLayer: LayerGroup|null = null;
    private map: Map|null = null;
    private layerGroups: LayerGroup[] = [];

    private mounted() {
        this.load();
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

    /**
     * Why this? Well the timeline control is hidden below the fucking bar on mobile devices with chrome.
     */
    private onWindowResize() {
        (document.querySelector('.grad-replay') as HTMLDivElement).style.maxHeight = `${window.innerHeight}px`;
    }

    private async load() {
        if (!this.id) return;

        this.loading = true;

        try {
            this.replay = await fetchReplay(this.id);
        } catch (err) {
            this.loading = false;
            console.error(err);
            return;
        }

        if (this.$route.query.frame) {
            this.frame = parseInt(this.$route.query.frame as string, 10);
        }

        if (! this.replay!.data) return;

        this.layerGroups = this.replay!.data.replay.map((frame: ReplayFrame) => {
            const pewPew: Polyline[] = [];
            const unitMarkers: UnitMarker[] = [];

            frame.data.forEach(record => {
                unitMarkers.push(new UnitMarker(record));

                if (record.target) {
                    pewPew.push(new Polyline(
                        [armaToLatLng(record.position), armaToLatLng(record.target)],
                        { color: record.color, weight: 2, opacity: 0.5 }
                    ));
                }
            });

            return new LayerGroup([...unitMarkers, ...pewPew]);
        });

        this.loading = false;
    }

    private mapCallback(map: Map) {
        this.map = map;
        this.createIcons();
    }

    @Watch('frame')
    private updateFrameUrlParam() {
        this.createIcons();
        this.$router.push({ query: { frame: this.frame.toString() }});
    }

    private async createIcons() {
        if (!this.map) return;

        if (this.frame < 0 || this.frame > this.layerGroups.length - 1) return;

        const oldLayer = this.drawnLayer;
        this.drawnLayer = this.layerGroups[this.frame];
        this.drawnLayer.addTo(this.map);
        if (oldLayer) oldLayer.removeFrom(this.map);
    }

    private get date(): string {
        if (!this.replay) return '';
        const d = this.replay.date;
        const pad = (num: number): string => (num < 10 ? '0' : '') + num.toString();
        const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        return `${date} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
}
</script>

<style lang="scss">
.grad-replay {
    position: relative;

    &__loading,
    &__error {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(255,255,255,0.8);
        z-index: 100;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

.grad--group {
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    margin: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
}
</style>
