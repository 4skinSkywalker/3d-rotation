import { Component } from '@angular/core';
import { MatrixComponent } from '../../components/matrix/matrix.component';

@Component({
    selector: 'app-main',
    imports: [MatrixComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    numOfMatrices = 5;
    sizeOfMatrices = 5;
    arraysOfPts: string[][] = [];

    ngOnInit() {
        const original = this.createPath(this.sizeOfMatrices**2);
        this.arraysOfPts.push(original);
        for (let i = 1; i < this.numOfMatrices; i++) {
            let newPts = undefined;
            let safe = 1e2;
            while(newPts == undefined && safe--) {
                const sliceOfOriginal = [...original].slice(0,1+Math.floor(Math.random()*(original.length-1)));
                const pts = this.createRemainingBlocks(sliceOfOriginal, original.length-sliceOfOriginal.length);
                const isAlreadyPresent = this.arraysOfPts.map(this.stringifyPath).includes(this.stringifyPath(pts!));
                if (!isAlreadyPresent) {
                    newPts = pts;
                }
            }
            this.arraysOfPts.push(newPts!);
        }
        const rndIdx = 1+Math.floor(Math.random()*(this.numOfMatrices-1));
        this.arraysOfPts[rndIdx] = original;
    }

    stringifyPath(path: string[]) {
        return path.join("-");
    }

    createPath(length: number) {
        const startX = Math.floor(Math.random() * this.sizeOfMatrices);
        const startY = Math.floor(Math.random() * this.sizeOfMatrices);
        const result = [`${startX};${startY};0`];
        this.createRemainingBlocks(result, length-1);
        return result;
    }

    createRemainingBlocks(blocks: string[], length: number) {
        const dirs = ["-1;0;0","1;0;0","0;-1;0","0;1;0","0;0;-1","0;0;1"];
        let safe1 = 1e2;
        while (length-- && safe1) {
            let newPos = undefined;
            let safe2 = 1e2;
            while (newPos == undefined && safe2) {
                const dir = dirs[Math.floor(Math.random()*dirs.length)];
                const [dx,dy,dz] = dir.split(";").map(Number);
                const prev = blocks[blocks.length-1];
                const [prevX,prevY,prevZ] = prev.split(";").map(Number);
                const newX = prevX+dx;
                const newY = prevY+dy;
                const newZ = prevZ+dz;
                const endBound = this.sizeOfMatrices-1;
                const isOutOfBounds = newX < 0 
                    || newX > endBound 
                    || newY < 0 
                    || newY > endBound 
                    || newZ < 0 
                    || newZ > endBound;
                if (!isOutOfBounds) {
                    newPos = `${newX};${newY};${newZ}`;
                }
            };
            blocks.push(newPos!);
        }
        return blocks;
    }
}
