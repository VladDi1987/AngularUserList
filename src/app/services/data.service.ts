import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toNumber } from 'ngx-bootstrap/timepicker/timepicker.utils';

@Injectable()
export class DataService {

    private selectedItems: Array<number> = [];
    private counter = 0;
    private interval: any;
    private data: User[] = [];
    private dataSource = new BehaviorSubject<User[]>(null);

    constructor(private userService: UserService,
                private toastr: ToastrService) {
    }

    public getDataSource(): Observable<any> {
        return this.dataSource.asObservable();
    }

    public loadDataSource(): void {
        this.userService.getUserList().subscribe(users => {
            this.data = users;
            this.setDataSource(users);
        });
    }

    public setDataSource(users: User[]): void {
        this.dataSource.next(users);
    }

    public addUser(user: User): void {
        this.userService.addUser(user).subscribe(() => {
            this.loadDataSource();
            this.toastr.success('', 'You have add the user');
        });
    }

    public remove(id: number): void {
        this.userService.removeUser(id).subscribe((response) => {
            this.loadDataSource();
            this.toastr.error('', 'You have deleted the user!');
        });
    }

    public updateUser(id: number, user: User): void {
        this.userService.updateUser(id, user).subscribe(() => {
            this.loadDataSource();
            this.toastr.success('', 'You have update the user');
        });
    }

    public multipleDelete(): void {
        if (this.selectedItems.length === 0) {
            this.toastr.info('', 'Select few users!');
            return;
        }
        this.data = this.data.filter((item) => !this.selectedItems.includes(item.id));
        this.setDataSource(this.data);
        this.interval = setInterval(() => {
            if (this.selectedItems.length > this.counter) {
                this.userService.removeUser(this.selectedItems[this.counter]).subscribe(() => {
                });
                this.counter++;
            } else {
                clearInterval(this.interval);
                this.selectedItems = [];
                this.toastr.info('', 'You have deleted the users!');
            }
        }, 500);
    }

    public updateCell(id: number, field: string, control: FormControl) {
        const user = this.data.find(element => element.id === id);
        user[field] = (field === 'age') ? parseInt(control.value) : control.value;
        this.userService.updateUser(user.id, user).subscribe(() => {
            this.loadDataSource();
            this.toastr.success('', 'You have update the user');
        });
    }

    public updateSelectedRows(value: boolean, id: number) {
        (value)
            ? this.selectedItems.push(id)
            : this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
    }

}
