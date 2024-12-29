import { Component, Input } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';

@Component({
    selector: 'app-matrix',
    imports: [CubeComponent],
    templateUrl: './matrix.component.html',
    styleUrl: './matrix.component.scss'
})
export class MatrixComponent {
    @Input("pts") pts: string[] = [];
    @Input("size") size = 5;
    uid = Math.random().toString(36).slice(2);
    rx = -45;
    ry = 0;
    destroyed = false;
    sceneWrap!: HTMLElement;
    scene!: HTMLElement;
    mouseenterHandler!: (mdevt: MouseEvent | TouchEvent) => void;

    ngAfterViewInit() {
        this.sceneWrap = document.querySelector("#scene-wrap_" + this.uid) as HTMLElement;
        this.scene = document.querySelector("#scene_" + this.uid) as HTMLElement;

        this.getRandomRotation();
        this.rotate();

        this.mouseenterHandler = (mdevt: MouseEvent | TouchEvent) => {
            let prevMouseX = (mdevt instanceof TouchEvent)  
                ? (mdevt as TouchEvent).touches[0].pageX
                : (mdevt as MouseEvent).pageX;
            let prevMouseY = (mdevt instanceof TouchEvent)  
                ? (mdevt as TouchEvent).touches[0].pageY
                : (mdevt as MouseEvent).pageY;
            const mouseMoveHandler = (mmevt: MouseEvent | TouchEvent) => {
                let mmX = (mmevt instanceof TouchEvent)  
                    ? (mmevt as TouchEvent).touches[0].pageX
                    : (mmevt as MouseEvent).pageX;
                let mmY = (mmevt instanceof TouchEvent)  
                    ? (mmevt as TouchEvent).touches[0].pageY
                    : (mmevt as MouseEvent).pageY;

                this.ry += mmX - prevMouseX;
                this.rx += prevMouseY - mmY;
                this.rx %= 360;
                this.ry %= 360;
                this.rotate();
                prevMouseX = mmX;
                prevMouseY = mmY;
            }
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("touchmove", mouseMoveHandler);

            document.addEventListener("mouseup", () =>
                document.removeEventListener("mousemove", mouseMoveHandler)
            );
            document.addEventListener("touchend", () =>
                document.removeEventListener("touchmove", mouseMoveHandler)
            );
        };

        this.sceneWrap.addEventListener("mousedown", this.mouseenterHandler);
        this.sceneWrap.addEventListener("touchstart", this.mouseenterHandler);
    }

    ngOnDestroy() {
        this.destroyed = true;
        this.sceneWrap.removeEventListener("mousedown", this.mouseenterHandler);
        this.sceneWrap.removeEventListener("touchstart", this.mouseenterHandler);
    }

    rotate = () => {
        this.scene!.style.transform = `rotateX(${Math.floor(this.rx)}deg) rotateY(${Math.floor(this.ry)}deg)`;
    }

    getRandomRotation = () => {
        this.rx = Math.floor(Math.random()*180);
        this.ry = Math.floor(Math.random()*180);
    }
}
