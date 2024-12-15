import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-cube',
    imports: [],
    templateUrl: './cube.component.html',
    styleUrl: './cube.component.scss'
})
export class CubeComponent {
    @Input("bg") bg = "#0000";
    
    @Input("size") size = 1;
    @HostBinding("style.fontSize") get _size() {
        return `${this.size}em`;
    }

    @Input("pos") pos = "0;0;0";
    @HostBinding("style.transform") get _pos() {
        const [x,y,z] = this.pos.split(";").map(Number);
        return `translateX(${x}em) translateY(${y}em) translateZ(${z-2}em)`;
    }
}
