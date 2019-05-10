import { Marker, DomUtil, DivIcon } from 'leaflet';
import { armaToLatLng } from '@/MapUtils';
import { Record} from '@/Models/';

export class UnitIcon extends DivIcon {
    private color: string;
    private text: string;
    private direction: number;

    /**
     * @param {LatLng} pos Position
     * @param {Number} dir Direction (Heading from north)
     */
    constructor(colorId?: number, icon?: string, text?: string, direction?: number) {

        const options: {
            iconUrl: string,
            iconSize: [number, number]
        } = {
            iconUrl: `/icons/${icon || 'iconman'}.png`,
            iconSize: [24, 24]
        };

        super(options);

        this.text = text || '';
        this.direction = direction || 0;

        if (colorId === undefined) {
            this.color = 'white';
        } else {
            this.color = [
                'rgba(0,76,153,1)',          // 0: WEST
                'rgba(127,0,0,1)',            // 1: EAST
                'rgba(0,127,0,1)',            // 2: INDEPENDENT
                'rgba(102,0,127,1)',          // 3: CIVILIAN
                'rgba(178,153,0,1)',          // 4: SIDEEMPTY
                'rgba(0,76,153,127)',        // 5: WEST unconscious
                'rgba(127,0,0,127)',          // 6: EAST unconscious
                'rgba(0,127,0,127)',          // 7: INDEPENDENT unconscious
                'rgba(102,0,127,127)',        // 8: CIVILIAN unconscious
                'rgba(178,153,0,127)',        // 9: SIDEEMPTY unconscious
                'rgba(51,51,51,127)',      // 10: dead unit
                'rgba(1,0,0,1)'               // 11: funkwagen-red when sending, speciality for "breaking contact"
            ][colorId];
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

        wrapper.style.position = 'relative';
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
    constructor({icon, colorId, position, direction, name, group}: Record) {
        const unitIcon = new UnitIcon(colorId, icon, name + group, direction);
        super(armaToLatLng(position), { icon: unitIcon });
    }
}
