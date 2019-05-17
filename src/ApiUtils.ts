import { MapMetaData, Replay } from './models';
import rp from 'request-promise';

export const WMTS_BASE_URL = 'https://maps.gruppe-adler.de';
export const API_BASE_URL = 'https://replay.gruppe-adler.de';

const mapMetaDataCache: { [index: string]: MapMetaData } = {};

export async function fetchMapMetaData(mapName: string): Promise<MapMetaData> {

    // meta data already fetched earlier
    if (mapMetaDataCache[mapName]) {
        return mapMetaDataCache[mapName];
    }

    // make http request
    const res = await rp(`${WMTS_BASE_URL}/${mapName}/meta.json`);

    // parse response if necessary
    if (typeof res === 'string') {
        return JSON.parse(res as string);
    }

    return res;
}

export async function fetchReplays(): Promise<Replay[]> {

    // make http request
    const res = await rp(`${API_BASE_URL}/`);

    // parse response if necessary
    let replays: Replay[] = typeof res === 'string' ? JSON.parse(res) : res;

    // date of replays is a string
    replays = replays.map(r => ({...r, date: new Date(r.date) }));

    return replays;
}

export async function fetchReplay(id: number): Promise<Replay|null> {

    // make http request
    const res = await rp(`${API_BASE_URL}/${id}`);

    // parse response if necessary
    const replay: Replay = typeof res === 'string' ? JSON.parse(res) : res;

    // date of replays is a string
    replay.date = new Date(replay.date);

    return replay;
}
