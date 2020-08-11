import { Component, OnInit, Input } from '@angular/core';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {

    public userName: string;
    public userAge: any;

    constructor() {
    }

    public ngOnInit(): void {
    }

    onAgeEmmit($event): void {
        this.userAge = $event;
    }

    updateUserList($event): void {
        this.userName = $event;
    }

}
