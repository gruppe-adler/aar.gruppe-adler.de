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

    const data = res.data.map((item: any) => {
        return {
            time: (item.splice(-1, 1) as number[])[0],
            data: item.map((record: any) => {
                const r = record as [string, number, [number, number], number, string, string, [number, number]|[]];
                return {
                    icon: r[0].toLowerCase() || 'iconman',
                    color: COLORS[r[1]],
                    position: r[2],
                    direction: r[3],
                    name: r[4],
                    group: r[5],
                    target: r[6] !== [] ? (r[6] as [number, number]) : undefined
                };
            })
        };
    });

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

const data1: Array<Array<[string, number, [number, number], number, string, string, [number, number]|[]]|number>> = [
    [
        ['iconMan', 0, [1887.71, 5696.76], 0, '', ' (Alpha 1-1)', []],
        12.0004
    ],
    [
        ['iconMan', 0, [1887.71, 5696.76], 0, 'Willard', ' (Alpha 1-1)', []],
        12.0004
    ],
    [
        ['iconMan', 0, [1887.73, 5698.89], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0006
    ],
    [
        ['iconMan', 0, [1891.02, 5699.37], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0009
    ],
    [
        ['iconMan', 0, [1894.23, 5698.47], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0012
    ],
    [
        ['iconMan', 0, [1897.44, 5697.59], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0015
    ],
    [
        ['iconMan', 0, [1900.69, 5696.84], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0018
    ],
    [
        ['iconMan', 0, [1903.94, 5696.13], 102, 'Willard', ' (Alpha 1-1)', []],
        12.002
    ],
    [
        ['iconMan', 0, [1906.19, 5695.65], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0023
    ],
    [
        ['iconMan', 0, [1907.03, 5695.47], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0026
    ],
    [
        ['iconMan', 0, [1910.83, 5694.65], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0029
    ],
    [
        ['iconMan', 0, [1914.29, 5693.86], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0031
    ],
    [
        ['iconMan', 0, [1917.49, 5692.95], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0034
    ],
    [
        ['iconMan', 0, [1920.69, 5692.03], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0037
    ],
    [
        ['iconMan', 0, [1923.9, 5691.11], 106, 'Willard', ' (Alpha 1-1)', []],
        12.004
    ],
    [
        ['iconMan', 0, [1927.11, 5690.22], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0043
    ],
    [
        ['iconMan', 0, [1930.33, 5689.35], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0045
    ],
    [
        ['iconMan', 0, [1933.56, 5688.47], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0048
    ],
    [
        ['iconMan', 0, [1936.78, 5687.6], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0051
    ],
    [
        ['iconMan', 0, [1939.98, 5686.97], 86, 'Willard', ' (Alpha 1-1)', []],
        12.0054
    ],
    [
        ['iconMan', 0, [1943.1, 5687.85], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0056
    ],
    [
        ['iconMan', 0, [1945.97, 5689.55], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0059
    ],
    [
        ['iconMan', 0, [1948.87, 5691.19], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0062
    ],
    [
        ['iconMan', 0, [1951.76, 5692.84], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0065
    ],
    [
        ['iconMan', 0, [1954.63, 5694.54], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0068
    ],
    [
        ['iconMan', 0, [1957.53, 5696.19], 59, 'Willard', ' (Alpha 1-1)', []],
        12.007
    ],
    [
        ['iconMan', 0, [1959.72, 5696.77], 20, 'Willard', ' (Alpha 1-1)', []],
        12.0073
    ],
    [
        ['iconMan', 0, [1960.31, 5698.2], 16, 'Willard', ' (Alpha 1-1)', []],
        12.0076
    ],
    [
        ['iconMan', 0, [1961.3, 5701.28], 351, 'Willard', ' (Alpha 1-1)', []],
        12.0079
    ],
    [
        ['iconMan', 0, [1961.12, 5704.17], 324, 'Willard', ' (Alpha 1-1)', []],
        12.0081
    ],
    [
        ['iconMan', 0, [1958.77, 5706.41], 301, 'Willard', ' (Alpha 1-1)', []],
        12.0084
    ],
    [
        ['iconMan', 0, [1955.85, 5708], 298, 'Willard', ' (Alpha 1-1)', []],
        12.0087
    ],
    [
        ['iconMan', 0, [1952.87, 5709.54], 301, 'Willard', ' (Alpha 1-1)', []],
        12.009
    ],
    [
        ['iconMan', 0, [1949.72, 5710.59], 327, 'Willard', ' (Alpha 1-1)', []],
        12.0093
    ],
    [
        ['iconMan', 0, [1947.66, 5712.78], 5, 'Willard', ' (Alpha 1-1)', []],
        12.0095
    ],
    [
        ['iconMan', 0, [1948.26, 5716.07], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0098
    ],
    [
        ['iconMan', 0, [1948.8, 5718.49], 27, 'Willard', ' (Alpha 1-1)', []],
        12.0101
    ],
    [
        ['iconMan', 0, [1950.49, 5721.11], 33, 'Willard', ' (Alpha 1-1)', []],
        12.0104
    ],
    [
        ['iconMan', 0, [1952.27, 5723.92], 32, 'Willard', ' (Alpha 1-1)', []],
        12.0106
    ],
    [
        ['iconMan', 0, [1953.32, 5726.86], 32, 'Willard', ' (Alpha 1-1)', []],
        12.0109
    ],
    [
        ['iconMan', 0, [1954.5, 5729.78], 31, 'Willard', ' (Alpha 1-1)', []],
        12.0112
    ],
    [
        ['iconMan', 0, [1956.28, 5732.6], 35, 'Willard', ' (Alpha 1-1)', []],
        12.0115
    ],
    [
        ['iconMan', 0, [1958.23, 5735.31], 36, 'Willard', ' (Alpha 1-1)', []],
        12.0118
    ],
    [
        ['iconMan', 0, [1960.2, 5738], 36, 'Willard', ' (Alpha 1-1)', []],
        12.012
    ],
    [
        ['iconMan', 0, [1962.34, 5740.6], 50, 'Willard', ' (Alpha 1-1)', []],
        12.0123
    ],
    [
        ['iconMan', 0, [1964.96, 5742.76], 71, 'Willard', ' (Alpha 1-1)', []],
        12.0126
    ],
    [
        ['iconMan', 0, [1968.28, 5743.27], 97, 'Willard', ' (Alpha 1-1)', []],
        12.0129
    ],
    [
        ['iconMan', 0, [1971.58, 5742.75], 101, 'Willard', ' (Alpha 1-1)', []],
        12.0131
    ],
    [
        ['iconMan', 0, [1974.84, 5742.15], 100, 'Willard', ' (Alpha 1-1)', []],
        12.0134
    ],
    [
        ['iconMan', 0, [1978.14, 5741.55], 100, 'Willard', ' (Alpha 1-1)', []],
        12.0137
    ],
    [
        ['iconMan', 0, [1981.41, 5740.9], 104, 'Willard', ' (Alpha 1-1)', []],
        12.014
    ],
    [
        ['iconMan', 0, [1984.59, 5739.76], 130, 'Willard', ' (Alpha 1-1)', []],
        12.0143
    ],
    [
        ['iconMan', 0, [1987.14, 5737.62], 130, 'Willard', ' (Alpha 1-1)', []],
        12.0145
    ],
    [
        ['iconMan', 0, [1989.71, 5735.49], 130, 'Willard', ' (Alpha 1-1)', []],
        12.0148
    ],
    [
        ['iconMan', 0, [1992.19, 5733.23], 139, 'Willard', ' (Alpha 1-1)', []],
        12.0151
    ],
    [
        ['iconMan', 0, [1994.3, 5730.62], 155, 'Willard', ' (Alpha 1-1)', []],
        12.0154
    ],
    [
        ['iconMan', 0, [1996.13, 5727.93], 134, 'Willard', ' (Alpha 1-1)', []],
        12.0156
    ],
    [
        ['iconMan', 0, [1998.04, 5725.1], 184, 'Willard', ' (Alpha 1-1)', []],
        12.0159
    ],
    [
        ['iconMan', 0, [1997.33, 5721.84], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0162
    ],
    [
        ['iconMan', 0, [1995.38, 5719.5], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0165
    ],
    [
        ['iconMan', 0, [1994.52, 5716.28], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0168
    ],
    [
        ['iconMan', 0, [1993.64, 5713.07], 195, 'Willard', ' (Alpha 1-1)', []],
        12.017
    ],
    [
        ['iconMan', 0, [1992.76, 5709.86], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0173
    ],
    [
        ['iconMan', 0, [1991.88, 5706.64], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0176
    ],
    [
        ['iconMan', 0, [1991.01, 5703.43], 195, 'Willard', ' (Alpha 1-1)', []],
        12.0179
    ],
    [
        ['iconMan', 0, [1990.11, 5700.22], 200, 'Willard', ' (Alpha 1-1)', []],
        12.0181
    ],
    [
        ['iconMan', 0, [1989.07, 5697.06], 196, 'Willard', ' (Alpha 1-1)', []],
        12.0184
    ],
    [
        ['iconMan', 0, [1988.06, 5693.98], 163, 'Willard', ' (Alpha 1-1)', []],
        12.0187
    ],
    [
        ['iconMan', 0, [1987.55, 5690.75], 130, 'Willard', ' (Alpha 1-1)', []],
        12.019
    ],
    [
        ['iconMan', 0, [1989.89, 5688.5], 129, 'Willard', ' (Alpha 1-1)', []],
        12.0193
    ],
    [
        ['iconMan', 0, [1992.57, 5686.53], 124, 'Willard', ' (Alpha 1-1)', []],
        12.0195
    ],
    [
        ['iconMan', 0, [1995.35, 5684.71], 122, 'Willard', ' (Alpha 1-1)', []],
        12.0198
    ],
    [
        ['iconMan', 0, [1997.88, 5682.9], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0201
    ],
    [
        ['iconMan', 0, [2001.1, 5682.05], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0204
    ],
    [
        ['iconMan', 0, [2004.31, 5681.13], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0206
    ],
    [
        ['iconMan', 0, [2007.53, 5680.18], 108, 'Willard', ' (Alpha 1-1)', []],
        12.0209
    ],
    [
        ['iconMan', 0, [2010.69, 5679.16], 108, 'Willard', ' (Alpha 1-1)', []],
        12.0212
    ],
    [
        ['iconMan', 0, [2013.86, 5678.14], 107, 'Willard', ' (Alpha 1-1)', []],
        12.0215
    ],
    [
        ['iconMan', 0, [2017.03, 5677.13], 108, 'Willard', ' (Alpha 1-1)', []],
        12.0218
    ],
    [
        ['iconMan', 0, [2020.21, 5676.13], 107, 'Willard', ' (Alpha 1-1)', []],
        12.022
    ],
    [
        ['iconMan', 0, [2023.39, 5675.13], 107, 'Willard', ' (Alpha 1-1)', []],
        12.0223
    ],
    [
        ['iconMan', 0, [2026.57, 5674.14], 107, 'Willard', ' (Alpha 1-1)', []],
        12.0226
    ],
    [
        ['iconMan', 0, [2029.77, 5673.26], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0229
    ],
    [
        ['iconMan', 0, [2033, 5672.46], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0231
    ],
    [
        ['iconMan', 0, [2036.25, 5671.7], 104, 'Willard', ' (Alpha 1-1)', []],
        12.0234
    ],
    [
        ['iconMan', 0, [2039.5, 5670.92], 104, 'Willard', ' (Alpha 1-1)', []],
        12.0237
    ],
    [
        ['iconMan', 0, [2042.73, 5670.11], 105, 'Willard', ' (Alpha 1-1)', []],
        12.024
    ],
    [
        ['iconMan', 0, [2045.95, 5669.24], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0243
    ],
    [
        ['iconMan', 0, [2049.16, 5668.36], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0245
    ],
    [
        ['iconMan', 0, [2052.38, 5667.48], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0248
    ],
    [
        ['iconMan', 0, [2055.59, 5666.57], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0251
    ],
    [
        ['iconMan', 0, [2058.77, 5665.71], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0254
    ],
    [
        ['iconMan', 0, [2061.73, 5664.32], 67, 'Willard', ' (Alpha 1-1)', []],
        12.0256
    ],
    [
        ['iconMan', 0, [2064.92, 5663.97], 82, 'Willard', ' (Alpha 1-1)', []],
        12.0259
    ],
    [
        ['iconMan', 0, [2068.24, 5663.61], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0262
    ],
    [
        ['iconMan', 0, [2071.51, 5662.94], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0265
    ],
    [
        ['iconMan', 0, [2074.74, 5662.08], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0268
    ],
    [
        ['iconMan', 0, [2077.96, 5661.22], 105, 'Willard', ' (Alpha 1-1)', []],
        12.027
    ],
    [
        ['iconMan', 0, [2081.18, 5660.37], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0273
    ],
    [
        ['iconMan', 0, [2084.4, 5659.51], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0276
    ],
    [
        ['iconMan', 0, [2087.63, 5658.66], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0279
    ],
    [
        ['iconMan', 0, [2090.83, 5657.81], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0281
    ],
    [
        ['iconMan', 0, [2094.06, 5656.95], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0284
    ],
    [
        ['iconMan', 0, [2097.29, 5656.09], 104, 'Willard', ' (Alpha 1-1)', []],
        12.0287
    ],
    [
        ['iconMan', 0, [2100.53, 5655.28], 104, 'Willard', ' (Alpha 1-1)', []],
        12.029
    ],
    [
        ['iconMan', 0, [2103.76, 5654.47], 104, 'Willard', ' (Alpha 1-1)', []],
        12.0293
    ],
    [
        ['iconMan', 0, [2106.98, 5653.68], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0295
    ],
    [
        ['iconMan', 0, [2110.01, 5652.59], 62, 'Willard', ' (Alpha 1-1)', []],
        12.0298
    ],
    [
        ['iconMan', 0, [2112.87, 5653.7], 47, 'Willard', ' (Alpha 1-1)', []],
        12.0301
    ],
    [
        ['iconMan', 0, [2114.78, 5656.3], 22, 'Willard', ' (Alpha 1-1)', []],
        12.0304
    ],
    [
        ['iconMan', 0, [2116.05, 5659.38], 22, 'Willard', ' (Alpha 1-1)', []],
        12.0306
    ],
    [
        ['iconMan', 0, [2117.41, 5662.42], 25, 'Willard', ' (Alpha 1-1)', []],
        12.0309
    ],
    [
        ['iconMan', 0, [2118.7, 5665.49], 20, 'Willard', ' (Alpha 1-1)', []],
        12.0312
    ],
    [
        ['iconMan', 0, [2119.8, 5668.87], 16, 'Willard', ' (Alpha 1-1)', []],
        12.0315
    ],
    [
        ['iconMan', 0, [2120.75, 5672.24], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0317
    ],
    [
        ['iconMan', 0, [2121.54, 5675.17], 15, 'Willard', ' (Alpha 1-1)', []],
        12.032
    ],
    [
        ['iconMan', 0, [2122.31, 5678.11], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0323
    ],
    [
        ['iconMan', 0, [2123.07, 5681.04], 14, 'Willard', ' (Alpha 1-1)', []],
        12.0326
    ],
    [
        ['iconMan', 0, [2123.8, 5684], 12, 'Willard', ' (Alpha 1-1)', []],
        12.0329
    ],
    [
        ['iconMan', 0, [2124.46, 5686.95], 12, 'Willard', ' (Alpha 1-1)', []],
        12.0331
    ],
    [
        ['iconMan', 0, [2124.2, 5690.15], 61, 'Willard', ' (Alpha 1-1)', [2667.79, 7501.58]],
        12.0334
    ],
    [
        ['iconMan', 0, [2124.38, 5692.91], 95, 'Willard', ' (Alpha 1-1)', [2372.63, 5702.06]],
        12.0337
    ],
    [
        ['iconMan', 0, [2124.61, 5695.34], 97, 'Willard', ' (Alpha 1-1)', []],
        12.034
    ],
    [
        ['iconMan', 0, [2124.93, 5697.75], 98, 'Willard', ' (Alpha 1-1)', []],
        12.0343
    ],
    [
        ['iconMan', 0, [2126.16, 5699.56], 28, 'Willard', ' (Alpha 1-1)', []],
        12.0345
    ],
    [
        ['iconMan', 0, [2127.14, 5702.39], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0348
    ],
    [
        ['iconMan', 0, [2127.92, 5705.32], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0351
    ],
    [
        ['iconMan', 0, [2128.71, 5708.2], 15, 'Willard', ' (Alpha 1-1)', [4003.2, 5507.65]],
        12.0354
    ],
    [
        ['iconMan', 0, [2129.46, 5710.63], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0356
    ],
    [
        ['iconMan', 0, [2130.17, 5713.22], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0359
    ],
    [
        ['iconMan', 0, [2130.9, 5715.91], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0362
    ],
    [
        ['iconMan', 0, [2131.63, 5718.59], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0365
    ],
    [
        ['iconMan', 0, [2132.37, 5721.28], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0368
    ],
    [
        ['iconMan', 0, [2133.43, 5723.7], 15, 'Willard', ' (Alpha 1-1)', []],
        12.037
    ],
    [
        ['iconMan', 0, [2134.16, 5726.38], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0373
    ],
    [
        ['iconMan', 0, [2134.89, 5729.06], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0376
    ],
    [
        ['iconMan', 0, [2135.63, 5731.76], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0379
    ],
    [
        ['iconMan', 0, [2136.36, 5734.44], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0381
    ],
    [
        ['iconMan', 0, [2137.11, 5737.1], 16, 'Willard', ' (Alpha 1-1)', []],
        12.0384
    ],
    [
        ['iconMan', 0, [2137.88, 5739.77], 16, 'Willard', ' (Alpha 1-1)', []],
        12.0387
    ],
    [
        ['iconMan', 0, [2138.66, 5742.44], 16, 'Willard', ' (Alpha 1-1)', []],
        12.039
    ],
    [
        ['iconMan', 0, [2139.45, 5745.1], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0393
    ],
    [
        ['iconMan', 0, [2140.27, 5747.76], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0395
    ],
    [
        ['iconMan', 0, [2141.09, 5750.42], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0398
    ],
    [
        ['iconMan', 0, [2141.91, 5753.08], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0401
    ],
    [
        ['iconMan', 0, [2142.73, 5755.73], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0404
    ],
    [
        ['iconMan', 0, [2143.55, 5758.39], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0406
    ],
    [
        ['iconMan', 0, [2144.37, 5761.05], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0409
    ],
    [
        ['iconMan', 0, [2145.19, 5763.71], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0412
    ],
    [
        ['iconMan', 0, [2146.01, 5766.37], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0415
    ],
    [
        ['iconMan', 0, [2146.89, 5769], 19, 'Willard', ' (Alpha 1-1)', []],
        12.0417
    ],
    [
        ['iconMan', 0, [2147.83, 5771.63], 26, 'Willard', ' (Alpha 1-1)', []],
        12.042
    ],
    [
        ['iconMan', 0, [2148.88, 5773.68], 17, 'Willard', ' (Alpha 1-1)', []],
        12.0423
    ],
    [
        ['iconMan', 0, [2149.97, 5775.46], 332, 'Willard', ' (Alpha 1-1)', []],
        12.0426
    ],
    [
        ['iconMan', 0, [2150.61, 5778.38], 328, 'Willard', ' (Alpha 1-1)', [2141.08, 5792.73]],
        12.0429
    ],
    [
        ['iconMan', 0, [2151.15, 5781.45], 322, 'Willard', ' (Alpha 1-1)', []],
        12.0431
    ],
    [
        ['iconMan', 0, [2151.48, 5784.35], 313, 'Willard', ' (Alpha 1-1)', []],
        12.0434
    ],
    [
        ['iconMan', 0, [2152.12, 5786.58], 357, 'Willard', ' (Alpha 1-1)', []],
        12.0437
    ],
    [
        ['iconMan', 0, [2152.93, 5789.51], 29, 'Willard', ' (Alpha 1-1)', []],
        12.044
    ],
    [
        ['iconMan', 0, [2154.69, 5792], 41, 'Willard', ' (Alpha 1-1)', []],
        12.0442
    ],
    [
        ['iconMan', 0, [2156.62, 5794.23], 41, 'Willard', ' (Alpha 1-1)', [1217.6, 7408.52]],
        12.0445
    ],
    [
        ['iconMan', 0, [2158.61, 5796.17], 51, 'Willard', ' (Alpha 1-1)', []],
        12.0448
    ],
    [
        ['iconMan', 0, [2160.96, 5797.64], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0451
    ],
    [
        ['iconMan', 0, [2163.58, 5798.67], 79, 'Willard', ' (Alpha 1-1)', []],
        12.0453
    ],
    [
        ['iconMan', 0, [2166.07, 5799.04], 86, 'Willard', ' (Alpha 1-1)', []],
        12.0456
    ],
    [
        ['iconMan', 0, [2168.85, 5799.12], 90, 'Willard', ' (Alpha 1-1)', []],
        12.0459
    ],
    [
        ['iconMan', 0, [2171.63, 5799.13], 90, 'Willard', ' (Alpha 1-1)', []],
        12.0462
    ],
    [
        ['iconMan', 0, [2174, 5800.17], 95, 'Willard', ' (Alpha 1-1)', []],
        12.0465
    ],
    [
        ['iconMan', 0, [2176.7, 5800.14], 94, 'Willard', ' (Alpha 1-1)', []],
        12.0468
    ],
    [
        ['iconMan', 0, [2179.47, 5799.93], 94, 'Willard', ' (Alpha 1-1)', []],
        12.047
    ],
    [
        ['iconMan', 0, [2182.24, 5799.72], 95, 'Willard', ' (Alpha 1-1)', []],
        12.0473
    ],
    [
        ['iconMan', 0, [2185.01, 5799.49], 95, 'Willard', ' (Alpha 1-1)', []],
        12.0476
    ],
    [
        ['iconMan', 0, [2187.77, 5799.26], 95, 'Willard', ' (Alpha 1-1)', []],
        12.0479
    ],
    [
        ['iconMan', 0, [2190.54, 5799.05], 95, 'Willard', ' (Alpha 1-1)', []],
        12.0481
    ],
    [
        ['iconMan', 0, [2193.31, 5798.84], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0484
    ],
    [
        ['iconMan', 0, [2196.09, 5798.73], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0487
    ],
    [
        ['iconMan', 0, [2198.89, 5798.61], 93, 'Willard', ' (Alpha 1-1)', []],
        12.049
    ],
    [
        ['iconMan', 0, [2201.73, 5798.48], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0492
    ],
    [
        ['iconMan', 0, [2204.65, 5797.69], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0495
    ],
    [
        ['iconMan', 0, [2207.42, 5796.91], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0498
    ],
    [
        ['iconMan', 0, [2210.08, 5796.16], 106, 'Willard', ' (Alpha 1-1)', []],
        12.0501
    ],
    [
        ['iconMan', 0, [2212.75, 5795.41], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0504
    ],
    [
        ['iconMan', 0, [2215.42, 5794.7], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0506
    ],
    [
        ['iconMan', 0, [2218.1, 5793.99], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0509
    ],
    [
        ['iconMan', 0, [2220.79, 5793.28], 105, 'Willard', ' (Alpha 1-1)', []],
        12.0512
    ],
    [
        ['iconMan', 0, [2223.5, 5792.71], 96, 'Willard', ' (Alpha 1-1)', []],
        12.0515
    ],
    [
        ['iconMan', 0, [2226.26, 5792.47], 92, 'Willard', ' (Alpha 1-1)', []],
        12.0517
    ],
    [
        ['iconMan', 0, [2229.03, 5792.26], 103, 'Willard', ' (Alpha 1-1)', []],
        12.052
    ],
    [
        ['iconMan', 0, [2231.75, 5791.69], 101, 'Willard', ' (Alpha 1-1)', []],
        12.0523
    ],
    [
        ['iconMan', 0, [2234.47, 5791.13], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0526
    ],
    [
        ['iconMan', 0, [2237.19, 5790.58], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0529
    ],
    [
        ['iconMan', 0, [2239.91, 5790.02], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0531
    ],
    [
        ['iconMan', 0, [2242.63, 5789.45], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0534
    ],
    [
        ['iconMan', 0, [2245.35, 5788.89], 102, 'Willard', ' (Alpha 1-1)', []],
        12.0537
    ],
    [
        ['iconMan', 0, [2248.09, 5788.41], 100, 'Willard', ' (Alpha 1-1)', []],
        12.054
    ],
    [
        ['iconMan', 0, [2250.83, 5787.94], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0542
    ],
    [
        ['iconMan', 0, [2253.56, 5787.47], 100, 'Willard', ' (Alpha 1-1)', []],
        12.0545
    ],
    [
        ['iconMan', 0, [2256.3, 5787], 100, 'Willard', ' (Alpha 1-1)', []],
        12.0548
    ],
    [
        ['iconMan', 0, [2259.04, 5786.53], 100, 'Willard', ' (Alpha 1-1)', []],
        12.0551
    ],
    [
        ['iconMan', 0, [2261.78, 5786.07], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0554
    ],
    [
        ['iconMan', 0, [2264.52, 5785.63], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0556
    ],
    [
        ['iconMan', 0, [2267.26, 5785.2], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0559
    ],
    [
        ['iconMan', 0, [2270, 5784.76], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0562
    ],
    [
        ['iconMan', 0, [2272.74, 5784.32], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0565
    ],
    [
        ['iconMan', 0, [2275.48, 5783.9], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0567
    ],
    [
        ['iconMan', 0, [2278.22, 5783.48], 99, 'Willard', ' (Alpha 1-1)', []],
        12.057
    ],
    [
        ['iconMan', 0, [2280.97, 5783.06], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0573
    ],
    [
        ['iconMan', 0, [2283.71, 5782.64], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0576
    ],
    [
        ['iconMan', 0, [2286.45, 5782.23], 99, 'Willard', ' (Alpha 1-1)', []],
        12.0579
    ],
    [
        ['iconMan', 0, [2289.22, 5782.22], 87, 'Willard', ' (Alpha 1-1)', []],
        12.0581
    ],
    [
        ['iconMan', 0, [2291.91, 5782.24], 71, 'Willard', ' (Alpha 1-1)', []],
        12.0584
    ],
    [
        ['iconMan', 0, [2294.46, 5781.87], 68, 'Willard', ' (Alpha 1-1)', []],
        12.0587
    ],
    [
        ['iconMan', 0, [2296.92, 5782.66], 63, 'Willard', ' (Alpha 1-1)', []],
        12.059
    ],
    [
        ['iconMan', 0, [2299.43, 5783.19], 63, 'Willard', ' (Alpha 1-1)', []],
        12.0592
    ],
    [
        ['iconMan', 0, [2301.88, 5783.95], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0595
    ],
    [
        ['iconMan', 0, [2304.31, 5785.39], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0598
    ],
    [
        ['iconMan', 0, [2306.69, 5786.73], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0601
    ],
    [
        ['iconMan', 0, [2309.13, 5788.07], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0604
    ],
    [
        ['iconMan', 0, [2311.57, 5789.48], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0606
    ],
    [
        ['iconMan', 0, [2313.94, 5790.84], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0609
    ],
    [
        ['iconMan', 0, [2316.42, 5792.21], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0612
    ],
    [
        ['iconMan', 0, [2318.84, 5793.56], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0615
    ],
    [
        ['iconMan', 0, [2321.23, 5794.89], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0617
    ],
    [
        ['iconMan', 0, [2323.7, 5796.26], 61, 'Willard', ' (Alpha 1-1)', []],
        12.062
    ],
    [
        ['iconMan', 0, [2326.12, 5797.6], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0623
    ],
    [
        ['iconMan', 0, [2328.53, 5798.98], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0626
    ],
    [
        ['iconMan', 0, [2330.93, 5800.39], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0629
    ],
    [
        ['iconMan', 0, [2333.32, 5801.8], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0631
    ],
    [
        ['iconMan', 0, [2335.65, 5803.24], 58, 'Willard', ' (Alpha 1-1)', []],
        12.0634
    ],
    [
        ['iconMan', 0, [2338.01, 5804.7], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0637
    ],
    [
        ['iconMan', 0, [2340.41, 5806.17], 58, 'Willard', ' (Alpha 1-1)', []],
        12.064
    ],
    [
        ['iconMan', 0, [2342.75, 5807.59], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0642
    ],
    [
        ['iconMan', 0, [2345.11, 5809.05], 58, 'Willard', ' (Alpha 1-1)', []],
        12.0645
    ],
    [
        ['iconMan', 0, [2347.47, 5810.51], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0648
    ],
    [
        ['iconMan', 0, [2349.83, 5811.98], 57, 'Willard', ' (Alpha 1-1)', []],
        12.0651
    ],
    [
        ['iconMan', 0, [2352.2, 5813.52], 57, 'Willard', ' (Alpha 1-1)', []],
        12.0654
    ],
    [
        ['iconMan', 0, [2354.44, 5815.15], 51, 'Willard', ' (Alpha 1-1)', []],
        12.0656
    ],
    [
        ['iconMan', 0, [2356.68, 5816.79], 55, 'Willard', ' (Alpha 1-1)', []],
        12.0659
    ],
    [
        ['iconMan', 0, [2358.96, 5818.37], 55, 'Willard', ' (Alpha 1-1)', []],
        12.0662
    ],
    [
        ['iconMan', 0, [2361.31, 5819.86], 60, 'Willard', ' (Alpha 1-1)', []],
        12.0665
    ],
    [
        ['iconMan', 0, [2363.71, 5821.28], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0668
    ],
    [
        ['iconMan', 0, [2365.7, 5823.01], 73, 'Willard', ' (Alpha 1-1)', []],
        12.067
    ],
    [
        ['iconMan', 0, [2367.51, 5824.81], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0673
    ],
    [
        ['iconMan', 0, [2370.02, 5825.99], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0676
    ],
    [
        ['iconMan', 0, [2372.54, 5827.17], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0679
    ],
    [
        ['iconMan', 0, [2375.06, 5828.34], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0681
    ],
    [
        ['iconMan', 0, [2377.58, 5829.51], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0684
    ],
    [
        ['iconMan', 0, [2380.1, 5830.69], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0687
    ],
    [
        ['iconMan', 0, [2382.59, 5831.84], 65, 'Willard', ' (Alpha 1-1)', []],
        12.069
    ],
    [
        ['iconMan', 0, [2385.12, 5833.01], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0692
    ],
    [
        ['iconMan', 0, [2387.67, 5834.2], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0695
    ],
    [
        ['iconMan', 0, [2390.19, 5835.37], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0698
    ],
    [
        ['iconMan', 0, [2392.72, 5836.54], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0701
    ],
    [
        ['iconMan', 0, [2395.24, 5837.71], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0704
    ],
    [
        ['iconMan', 0, [2397.76, 5838.88], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0706
    ],
    [
        ['iconMan', 0, [2400.28, 5840.05], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0709
    ],
    [
        ['iconMan', 0, [2402.76, 5841.17], 66, 'Willard', ' (Alpha 1-1)', []],
        12.0712
    ],
    [
        ['iconMan', 0, [2405.33, 5842.33], 66, 'Willard', ' (Alpha 1-1)', []],
        12.0715
    ],
    [
        ['iconMan', 0, [2407.87, 5843.47], 66, 'Willard', ' (Alpha 1-1)', []],
        12.0717
    ],
    [
        ['iconMan', 0, [2409.95, 5844.11], 70, 'Willard', ' (Alpha 1-1)', []],
        12.072
    ],
    [
        ['iconMan', 0, [2411.91, 5843.62], 15, 'Willard', ' (Alpha 1-1)', []],
        12.0723
    ],
    [
        ['iconMan', 0, [2414.34, 5843.91], 350, 'Willard', ' (Alpha 1-1)', []],
        12.0726
    ],
    [
        ['iconMan', 0, [2416.66, 5844.73], 344, 'Willard', ' (Alpha 1-1)', []],
        12.0729
    ],
    [
        ['iconMan', 0, [2418.96, 5845.18], 355, 'Willard', ' (Alpha 1-1)', []],
        12.0731
    ],
    [
        ['iconMan', 0, [2420.91, 5846.85], 67, 'Willard', ' (Alpha 1-1)', []],
        12.0734
    ],
    [
        ['iconMan', 0, [2423.8, 5847.85], 75, 'Willard', ' (Alpha 1-1)', [3018.76, 7440.41]],
        12.0737
    ],
    [
        ['iconMan', 0, [2426.74, 5848.61], 76, 'Willard', ' (Alpha 1-1)', []],
        12.074
    ],
    [
        ['iconMan', 0, [2429.68, 5849.27], 78, 'Willard', ' (Alpha 1-1)', []],
        12.0742
    ],
    [
        ['iconMan', 0, [2432.35, 5849.84], 78, 'Willard', ' (Alpha 1-1)', []],
        12.0745
    ],
    [
        ['iconMan', 0, [2435.11, 5850.44], 78, 'Willard', ' (Alpha 1-1)', []],
        12.0748
    ],
    [
        ['iconMan', 0, [2437.78, 5851.03], 78, 'Willard', ' (Alpha 1-1)', []],
        12.0751
    ],
    [
        ['iconMan', 0, [2440.55, 5851.59], 80, 'Willard', ' (Alpha 1-1)', []],
        12.0754
    ],
    [
        ['iconMan', 0, [2443.28, 5852.03], 81, 'Willard', ' (Alpha 1-1)', []],
        12.0756
    ],
    [
        ['iconMan', 0, [2446.03, 5852.48], 81, 'Willard', ' (Alpha 1-1)', []],
        12.0759
    ],
    [
        ['iconMan', 0, [2448.71, 5853.13], 63, 'Willard', ' (Alpha 1-1)', []],
        12.0762
    ],
    [
        ['iconMan', 0, [2451.13, 5854.5], 66, 'Willard', ' (Alpha 1-1)', []],
        12.0765
    ],
    [
        ['iconMan', 0, [2452.36, 5855.07], 49, 'Willard', ' (Alpha 1-1)', []],
        12.0767
    ],
    [
        ['iconMan', 0, [2455.2, 5855.47], 66, 'Willard', ' (Alpha 1-1)', []],
        12.077
    ],
    [
        ['iconMan', 0, [2458.03, 5856.47], 75, 'Willard', ' (Alpha 1-1)', []],
        12.0773
    ],
    [
        ['iconMan', 0, [2460.85, 5856.03], 55, 'Willard', ' (Alpha 1-1)', []],
        12.0776
    ],
    [
        ['iconMan', 0, [2463.61, 5856.84], 65, 'Willard', ' (Alpha 1-1)', []],
        12.0779
    ],
    [
        ['iconMan', 0, [2466.4, 5857.08], 63, 'Willard', ' (Alpha 1-1)', [2676.15, 6034.82]],
        12.0781
    ],
    [
        ['iconMan', 0, [2469.43, 5856.58], 51, 'Willard', ' (Alpha 1-1)', []],
        12.0784
    ],
    [
        ['iconMan', 0, [2472.22, 5857.11], 70, 'Willard', ' (Alpha 1-1)', []],
        12.0787
    ],
    [
        ['iconMan', 0, [2475, 5856.6], 54, 'Willard', ' (Alpha 1-1)', []],
        12.079
    ],
    [
        ['iconMan', 0, [2478, 5856.91], 75, 'Willard', ' (Alpha 1-1)', []],
        12.0792
    ],
    [
        ['iconMan', 0, [2480.9, 5857.66], 75, 'Willard', ' (Alpha 1-1)', []],
        12.0795
    ],
    [
        ['iconMan', 0, [2483.92, 5858.31], 81, 'Willard', ' (Alpha 1-1)', []],
        12.0798
    ],
    [
        ['iconMan', 0, [2486.53, 5859.38], 28, 'Willard', ' (Alpha 1-1)', []],
        12.0801
    ],
    [
        ['iconMan', 0, [2488.96, 5859.62], 79, 'Willard', ' (Alpha 1-1)', [2786.93, 6090.48]],
        12.0804
    ],
    [
        ['iconMan', 0, [2492, 5859.8], 89, 'Willard', ' (Alpha 1-1)', []],
        12.0806
    ],
    [
        ['iconMan', 0, [2494.88, 5858.88], 61, 'Willard', ' (Alpha 1-1)', []],
        12.0809
    ],
    [
        ['iconMan', 0, [2497.85, 5858.19], 59, 'Willard', ' (Alpha 1-1)', []],
        12.0812
    ],
    [
        ['iconMan', 0, [2500.48, 5859.37], 50, 'Willard', ' (Alpha 1-1)', []],
        12.0815
    ],
    [
        ['iconMan', 0, [2502.78, 5859.52], 28, 'Willard', ' (Alpha 1-1)', []],
        12.0817
    ],
    [
        ['iconMan', 0, [2505.66, 5859.96], 89, 'Willard', ' (Alpha 1-1)', []],
        12.082
    ],
    [
        ['iconMan', 0, [2508.7, 5859.88], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0823
    ],
    [
        ['iconMan', 0, [2511.73, 5859.72], 93, 'Willard', ' (Alpha 1-1)', []],
        12.0826
    ],
    [
        ['iconMan', 0, [2514.47, 5859.64], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0829
    ],
    [
        ['iconMan', 0, [2517.29, 5859.58], 91, 'Willard', ' (Alpha 1-1)', [4068.02, 6840.46]],
        12.0831
    ],
    [
        ['iconMan', 0, [2520.07, 5859.52], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0834
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []],
        12.0836
    ],
    [
        ['iconMan', 0, [2521.6, 5859.49], 91, 'Willard', ' (Alpha 1-1)', []], 12.0836
    ]
];
