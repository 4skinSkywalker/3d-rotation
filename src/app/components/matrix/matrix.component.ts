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
    mouseenterHandler!: (mdevt: MouseEvent) => void;

    ngAfterViewInit() {
        this.sceneWrap = document.querySelector("#scene-wrap_" + this.uid) as HTMLElement;
        this.scene = document.querySelector("#scene_" + this.uid) as HTMLElement;

        this.getRandomRotation();
        this.rotate();

        this.mouseenterHandler = (mdevt: MouseEvent) => {
            let prevMouseX = mdevt.pageX;
            let prevMouseY = mdevt.pageY;
            const mouseMoveHandler = (mmevt: MouseEvent) => {
                this.ry += mmevt.pageX - prevMouseX;
                this.rx += prevMouseY - mmevt.pageY;
                this.rx %= 360;
                this.ry %= 360;
                this.rotate();
                prevMouseX = mmevt.pageX;
                prevMouseY = mmevt.pageY;
            }
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", () =>
                document.removeEventListener("mousemove", mouseMoveHandler)
            );
        };
        this.sceneWrap.addEventListener("mousedown", this.mouseenterHandler);
    }

    ngOnDestroy() {
        this.destroyed = true;
        this.sceneWrap.removeEventListener("mousedown", this.mouseenterHandler);
    }

    rotate = () => {
        this.scene!.style.transform = `rotateX(${Math.floor(this.rx)}deg) rotateY(${Math.floor(this.ry)}deg)`;
    }

    getRandomRotation = () => {
        this.rx = Math.floor(Math.random()*180);
        this.ry = Math.floor(Math.random()*180);
    }
}
