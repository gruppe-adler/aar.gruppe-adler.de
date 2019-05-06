import { MapMetaData, Replay } from './models';
import rp from 'request-promise';

export const BASE_URL = 'http://localhost:3000';

const mapMetaDataCache: { [index: string]: MapMetaData } = {};

export async function fetchMapMetaData(mapName: string): Promise<MapMetaData> {

    // meta data already fetched earlier
    if (mapMetaDataCache[mapName]) {
        return mapMetaDataCache[mapName];
    }

    // make http request
    const res = await rp(`${BASE_URL}/${mapName}/meta.json`);

    // parse response if necessary
    if (typeof res === 'string') {
        return JSON.parse(res as string);
    }

    return res;
}

export async function fetchReplays(): Promise<Replay[]> {
    return [
        {
            id: 10,
            missionName: 'Hold the line!',
            date: new Date(),
            duration: 7200000,
            worldName: 'tembelan'
        },
        {
            id: 9,
            missionName: 'Green Mountain',
            date: new Date(),
            duration: 7200000,
            worldName: 'Malden2035'
        }
    ];
}
export async function fetchReplay(id: number): Promise<Replay|null> {
    return null;
}
