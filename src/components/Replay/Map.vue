<template>
    <div>
        <div class="grad-map" ref="map"></div>
        <md-progress-spinner v-if="loading" :md-diameter="100" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <span v-if="error !== ''">{{error}}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Map, CRS, LatLngBounds } from 'leaflet';
import { BASE_URL, fetchMapMetaData } from '@/ApiUtils';
import { MapMetaData, ArmaTileLayer } from '@/models';
import 'leaflet/dist/leaflet.css';

const POS_FACTOR = 100;

@Component
export default class MapVue extends Vue {
    @Prop() private worldName?: string;
    @Prop() private callback?: (map: Map) => any;

    private map?: Map;
    private metaData?: MapMetaData;
    private loading: boolean = true;
    private error: string = '';

    private mounted() {
        this.setupMap();
        this.loadMap();
    }

    private beforeDestroy() {
        if (this.map) this.map.remove();
    }

    /**
     * This methods sets up the leafelt map.
     */
    private setupMap(): Map {
        if (this.map) return this.map;

        this.map = new Map(this.$refs.map as HTMLDivElement, {
            crs: CRS.Simple,
            attributionControl: false,
            zoomControl: false
        });
        this.map.setView([0, 0], 0);

        if (this.callback) this.callback(this.map);

        return this.map;
    }

    /**
     * This methods handles the map initialization (Adding correct base layer, setting bounds, setting extent etc.)
     */
    @Watch('worldName')
    private async loadMap() {
        if (! this.worldName) return;
        const map = this.setupMap();

        this.loading = true;

        try {
            this.metaData = await fetchMapMetaData(this.worldName);
        } catch (err) {
            this.loading = false;
            this.error = `Coudln't load meta data for map '${this.worldName}' :(`;
            return;
        }

        const size = this.metaData.worldSize / POS_FACTOR;
        const bounds = new LatLngBounds([0, 0], [size, size]);

        // remove all previos layers
        map.eachLayer(layer => map.removeLayer(layer));

        new ArmaTileLayer(`${BASE_URL}/${this.worldName}/tiles/{z}/{x}-{y}.png`, this.metaData.worldSize, {
            errorTileUrl: `${BASE_URL}/error/100m.png`,
            maxNativeZoom: this.metaData.maxZoom,
            minNativeZoom: this.metaData.minZoom,
            noWrap: true,
            bounds
        }).addTo(map);

        map.fitBounds(bounds);

        // add a little bit to max bound to let the map not end directly with the last tile
        map.setMaxBounds( bounds.pad(0.05) );

        this.loading = false;
    }

}
</script>

<style lang="scss" scoped>

div {
    position: absolute;
    z-index: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    span {
        z-index: 1000;
    }
}
</style>
