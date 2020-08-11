import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAgeParam } from '../models/models';

@Injectable()
export class SearchStore {

    private currentName = new Subject<string>();
    private currentAge = new Subject<IAgeParam>();

    constructor() {
    }

    public getDesiredName() {
        return this.currentName.asObservable();
    }

    public setDesiredName(name) {
        this.currentName.next(name);
    }

    public getDesiredAge() {
        return this.currentAge.asObservable();
    }

    public setDesiredAge(param: IAgeParam) {
        this.currentAge.next(param);
    }


}
