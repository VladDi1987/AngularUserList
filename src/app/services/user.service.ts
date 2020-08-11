import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlService } from './url.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
                private urlService: UrlService) {
    }

    getUserList(): Observable<User[]> {
        return this.http.get<User[]>(this.urlService.userUrl);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.urlService.userUrl, user);
    }

    removeUser(id: number): Observable<any> {
        return this.http.delete(`${this.urlService.userUrl}/${id}`);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.urlService.userUrl}/${id}`, user);
    }

}
