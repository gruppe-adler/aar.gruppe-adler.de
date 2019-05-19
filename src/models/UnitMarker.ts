import { Marker, DivIcon } from 'leaflet';
import { armaToLatLng } from '@/MapUtils';
import { ReplayRecord } from './ReplayData';

export class UnitIcon extends DivIcon {
    private color: string;
    private text: string;
    private direction: number;

    /**
     * @param {LatLng} pos Position
     * @param {Number} dir Direction (Heading from north)
     */
    constructor(color: string, icon: string, text: string, direction: number) {

        const options: {
            iconUrl: string,
            iconSize: [number, number]
        } = {
            iconUrl: resolveIconUrl(icon),
            iconSize: [24, 24]
        };

        super(options);

        this.text = text || '';
        this.direction = direction || 0;

        if (color === undefined) {
            this.color = 'white';
        } else {
            this.color = color;
        }

    }

    public createIcon(oldIcon?: HTMLElement): HTMLElement {
        const src = this.options.iconUrl;

        const wrapper = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div');

        wrapper.className = 'grad-map__unit-icon';

        const size = this.options.iconSize as [number, number];

        wrapper.style.marginLeft = `-${size[0] / 2}px`;
        wrapper.style.marginTop  = `-${size[1] / 2}px`;

        wrapper.style.width  = `${size[0]}px`;
        wrapper.style.height = `${size[1]}px`;

        wrapper.style.position = 'absolute';
        wrapper.style.top = '0px';
        wrapper.style.left = '0px';
        wrapper.style.transformOrigin = 'center';

        const icon = document.createElement('div');
        icon.style.backgroundColor = this.color;
        icon.style.webkitMaskImage = `url(${src})`;
        icon.style.maskImage = `url(${src})`;
        icon.style.webkitMaskSize = 'contain';
        icon.style.transform = `rotateZ(${this.direction}deg)`;
        icon.style.width  = `${size[0]}px`;
        icon.style.height = `${size[1]}px`;

        wrapper.appendChild(icon);

        const span = document.createElement('span');
        span.innerText = this.text;
        span.style.display = 'flex';
        span.style.justifyContent = 'center';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        span.style.top = '20px';
        span.style.left = '0px';
        span.style.right = '0px';
        wrapper.appendChild(span);

        return wrapper;
    }

}

export class UnitMarker extends Marker {
    /**
     * @param {[number, number]} pos Arma Position
     * @param {Number} dir Direction (Heading from north)
     */
    constructor({icon, color, position, direction, name, group}: ReplayRecord) {
        const unitIcon = new UnitIcon(color, icon, name + group, direction);
        super(armaToLatLng(position), { icon: unitIcon });
    }
}



const resolveIconUrl = (icon: string) => {
    const base = `${process.env.BASE_URL || '/'}icons/`;

    icon = icon.toLowerCase();


    if (icon.match(/^iconman/i)) {
        return `${base}man/${icon}.png`;
    }

    const supportedTypes = [
        'staticmortar',
        'static',
        'tank',
        'helicopter',
        'parachute',
        'car',
        'plane',
        'truck',
        'motorcycle',
        'ship',
        'unknown'
    ];

    if (!supportedTypes.includes(icon)) icon = 'unknown';

    return  `${base}${icon}.png`;
};
