import { Component } from '@angular/core';
import { MatrixComponent } from '../../components/matrix/matrix.component';
import { dirs, getPosDiff, getPosSum, getXYZ, stringifyPath } from '../../utils';

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
    zoom = 1;

    ngOnInit() {
        this.init();
    }

    init() {
        this.arraysOfPts = [];

        const original = this.createPath(this.sizeOfMatrices**2);
        this.arraysOfPts.push(original);
        for (let i = 1; i < this.numOfMatrices; i++) {
            let newPts = undefined;
            let fallbackPts = undefined;
            let safe = 1e2;
            while(newPts == undefined && safe--) {
                fallbackPts = this.modifyPath([...original]);
                const isAlreadyPresent = this.arraysOfPts.map(stringifyPath).includes(stringifyPath(fallbackPts));
                newPts = !isAlreadyPresent ? fallbackPts : undefined;
            }
            this.arraysOfPts.push(newPts || fallbackPts!);
        }

        const rndIdx = 1+Math.floor(Math.random()*(this.numOfMatrices-1));
        this.arraysOfPts[rndIdx] = original;
    }

    createPath(length: number) {
        const startX = Math.floor(Math.random() * this.sizeOfMatrices);
        const startY = Math.floor(Math.random() * this.sizeOfMatrices);
        const result = [`${startX};${startY};0`];
        length--;
        let safe1 = 1e2;
        while (length-- && safe1) {
            let newPos = undefined;
            let fallbackPos = undefined;
            let safe2 = 1e2;
            while (newPos == undefined && safe2) {
                const dir = dirs[Math.floor(Math.random()*dirs.length)];
                const prev = result[result.length-1];
                fallbackPos = getPosSum(prev, dir);
                const oob = this.isOutOfBounds(fallbackPos);
                newPos = !oob ? fallbackPos : undefined;
            };
            result.push(newPos || fallbackPos!);
        }
        return result;
    }

    isOutOfBounds(pos: string) {
        const [x,y,z] = getXYZ(pos);
        const endBound = this.sizeOfMatrices-1;
        return x < 0
            || x > endBound
            || y < 0
            || y > endBound
            || z < 0
            || z > endBound;
    }

    modifyPath(path: string[]) {
        for (let i = 0; i < path.length-1; i++) {
            const curr = path[i];

            if (Math.random() < 0.85) {
                path[i+1] = getPosSum(curr, getPosDiff(path[i], path[i+1]));
                continue;
            }

            let safe = 1e2;
            let newPos = undefined;
            let fallbackPos = undefined;
            while (newPos == undefined && safe) {
                const dir = dirs[Math.floor(Math.random()*dirs.length)];
                fallbackPos = getPosSum(curr, dir);
                const oob = this.isOutOfBounds(fallbackPos);
                newPos = !oob ? fallbackPos : undefined;
            }
            path[i+1] = newPos || fallbackPos!;
        }

        return path;
    }

    checkAnswer(original: string[], choosen: string[]) {
        const isCorrect = stringifyPath(original) === stringifyPath(choosen);
        if (isCorrect) {
            alert("Well done! Your answer is correct!");
            this.init();
        } else {
            alert("Sorry, your answer is not correct.");
        }
    }
}
