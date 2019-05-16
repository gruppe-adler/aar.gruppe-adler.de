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
    if (typeof res === 'string') {
        return JSON.parse(res as string);
    }

    return res;
}

export async function fetchReplay(id: number): Promise<Replay|null> {

    // make http request
    let res = await rp(`${API_BASE_URL}/${id}`);

    // parse response if necessary
    if (typeof res === 'string') {
        res = JSON.parse(res as string);
    }

    const data = res.data.map(
    (item: Array<[string, number, [number, number], number, string, string, [number, number]|[]]|number>) => ({
            time: (item.splice(-1, 1) as number[])[0],
            data: item.map(record => { // tslint:disable-line:max-line-length
                record = record as [string, number, [number, number], number, string, string, [number, number]|[]];
                const [icon, color, position, direction, name, group, target ] = record;
                return {
                    icon: icon.toLowerCase() || 'iconman',
                    color: COLORS[color],
                    position,
                    direction,
                    name,
                    group,
                    target: target !== [] ? target : undefined
                };
            })
    }));

    return {
        ...res,
        data
    };
}


export const COLORS = [
    'rgba(0,76,153,1)',           // 0: WEST
    'rgba(127,0,0,1)',            // 1: EAST
    'rgba(0,127,0,1)',            // 2: INDEPENDENT
    'rgba(102,0,127,1)',          // 3: CIVILIAN
    'rgba(178,153,0,1)',          // 4: SIDEEMPTY
    'rgba(0,76,153,127)',         // 5: WEST unconscious
    'rgba(127,0,0,127)',          // 6: EAST unconscious
    'rgba(0,127,0,127)',          // 7: INDEPENDENT unconscious
    'rgba(102,0,127,127)',        // 8: CIVILIAN unconscious
    'rgba(178,153,0,127)',        // 9: SIDEEMPTY unconscious
    'rgba(51,51,51,127)',         // 10: dead unit
    'rgba(1,0,0,1)'               // 11: funkwagen-red when sending, speciality for "breaking contact"
];
