export default interface Record {
    icon: string;
    colorId: number;
    position: [number, number];
    direction: number;
    name: string;
    group: string;
    target?: [number, number];
}
