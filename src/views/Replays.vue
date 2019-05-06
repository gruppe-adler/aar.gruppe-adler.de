<template>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <h1 class="md-title">Replays</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state
            md-icon="sentiment_dissatisfied"
            md-label="No users found"
            :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
            <md-button class="md-primary md-raised">Create New User</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="missionName">{{ item.missionName }}</md-table-cell>
            <md-table-cell md-label="Date" md-sort-by="date">{{ item.date }}</md-table-cell>
            <md-table-cell md-label="Duration" md-sort-by="duration">{{ item.duration }}</md-table-cell>
            <md-table-cell md-label="Map" md-sort-by="worldName">{{ item.worldName }}</md-table-cell>
        </md-table-row>
    </md-table>
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
        this.replays = await fetchReplays();
        this.searchOnTable();
    }

    private searchOnTable() {
        if (this.search === '') {
            this.searched = this.replays;
            return;
        }

        this.searched = this.replays.filter(re => re.missionName.toLowerCase().includes(this.search.toLowerCase()));
    }
}
</script>

<style lang="scss" scoped>
.grad-replays {
    margin: 10px;
}
</style>


