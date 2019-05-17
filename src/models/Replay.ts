import ReplayData from './ReplayData';

export default interface Replay {
    id: number;
    missionName: string;
    date: Date;
    duration: number;
    worldName: string;
    data?: ReplayData;
}
