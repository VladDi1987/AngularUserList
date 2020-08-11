import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    private baseUrl = 'http://localhost:3000';

    public readonly userUrl = `${this.baseUrl}/users`;

    constructor() {
    }

}
