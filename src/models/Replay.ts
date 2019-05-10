import Frame from './Frame';

export default interface Replay {
    id: number;
    missionName: string;
    date: Date;
    duration: number;
    worldName: string;
    data?: Frame[];
}
