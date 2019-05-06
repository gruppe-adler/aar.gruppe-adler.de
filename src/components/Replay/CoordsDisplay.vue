<template>
    <div class="grad-coords-display grad--group">
        <span>{{coordsString}}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LatLng } from 'leaflet';

@Component
export default class CoordsDisplayVue extends Vue {
    @Prop() private coords?: LatLng;

    private get coordsString(): string {
        if (! this.coords) return '';

        const x = Math.floor(this.coords.lng);
        const y = Math.floor(this.coords.lat);

        return `${x.toString().padStart(3, '0')}  ${y.toString().padStart(3, '0')}`;
    }
}
</script>