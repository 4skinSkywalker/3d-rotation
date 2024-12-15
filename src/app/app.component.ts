import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = '3d-rotation';

    constructor() {
        document.addEventListener("contextmenu", evt =>
            evt.preventDefault()
        );
    }
}
