<template>
    <div class="grad-replays">
        <div class="grad-replays__header">
            <h1>Replays</h1>
            <md-field md-clearable>
                <md-icon>search</md-icon>
                <md-input v-model="search" @input="searchOnTable" />
            </md-field>
        </div>
        <div class="grad-replays__content">

            <div class="grad-replays__content-row grad-replays--header">
                <div>Name</div>
                <div>Datum</div>
                <div>Dauer</div>
                <div>Karte</div>
                <div></div>
            </div>
            <div class="grad-replays__content-row" v-for="row in searched" :key="row.id">
                <div>{{row.missionName}}</div>
                <div>{{date(row.date)}}</div>
                <div>{{duration(row.duration)}}</div>
                <div>{{row.worldName}}</div>
                <md-button class="md-icon-button md-primary md-dense" @click="selectReplay(row)">
                    <md-icon>play_arrow</md-icon>
                </md-button>
            </div>
            <md-empty-state
                v-if="searched.length === 0 && search !== ''"
                md-icon="sentiment_dissatisfied"
                md-label="Keine Replays gefunden"
                :md-description="`Kein Replay für die Suche '${search}' gefunden.`">
            </md-empty-state>
            <md-empty-state
                v-if="searched.length === 0 && search == ''"
                md-icon="sentiment_dissatisfied"
                md-label="Keine Replays gefunden"
                md-description="Es konnten keine Replays geladen werden">
                <md-button @click="load" class="md-primary md-raised">Reload</md-button>
            </md-empty-state>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Replay } from '@/models';
import { fetchReplays } from '../ApiUtils';

@Component
export default class ReplaysVue extends Vue {
    private searched: Replay[] = [];
    private replays: Replay[] = [];
    private search: string = '';

    private mounted() {
        this.load();
    }

    private async load() {
        const replays = await fetchReplays();

        this.replays = replays.sort((a, b) => (b.date.getTime() - a.date.getTime()));

        this.searchOnTable();
    }

    private searchOnTable() {
        if (this.search === '') {
            this.searched = this.replays;
            return;
        }

        this.searched = this.replays.filter(re => re.missionName.toLowerCase().includes(this.search.toLowerCase()));
    }

    private selectReplay(replay: Replay) {
        this.$router.push(`/replay/${replay.id}`);
    }

    /**
     * This function turns a date to a nicley formatted string
     * @param {Date} d Date
     * @returns {string} Formatted date
     */
    private date(d: Date): string {

        const pad = (num: number): string => (num < 10 ? '0' : '') + num.toString();
        const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        return `${date} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    /**
     * This function turns a number of seconds to a nicley formatted duration
     * @param {number} sec Number of seconds
     * @returns {string} Formatted duration
     */
    private duration(sec: number): string {
        const pad = (num: number): string => (num < 10 ? '0' : '') + num.toString();
        const minutes = Math.floor(sec / 60);

        return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
    }
}
</script>

<style lang="scss" scoped>
.grad-replays {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    &__header {
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .md-field {
            max-width: 400px;
        }
    }

    &__content {
        overflow-y: auto;

        &-row {
            border-bottom: 1px solid rgba(0,0,0,0.1);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 40px;
            grid-auto-rows: min-content;
            padding: 5px 10px;

            @media (max-width: 900px) {
                grid-template-columns: 1fr 1fr 1fr 0px 40px;
            }

            @media (max-width: 600px) {
                grid-template-columns: 1fr 1fr 0px 0px 40px;
            }

            &:hover {
                background-color: rgba(0, 0, 0, 0.01);
            }

            > * {
                align-self: center;
                overflow-x: hidden;
            }

            &.grad-replays--header {
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                z-index: 100;
                background-color: var(--md-theme-default-background-variant, #fafafa);
                position: sticky;
                top: 0px;
                font-weight: bold;
            }
        }
    }
}
</style>


