export default interface Record {
    icon: string;
    color: string;
    position: [number, number];
    direction: number;
    name: string;
    group: string;
    target?: [number, number];
}
