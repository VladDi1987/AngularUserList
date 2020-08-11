import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { SearchStore } from '../../storage/search.store';
import { DataService } from '../../services/data.service';
import { PaginationInstance } from 'ngx-pagination';
import * as Config from '../../configs/general-config';
import * as Models from '../../models/models';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, OnDestroy {

    public columns: Array<string> = Config.StaticDataConfig.columns;
    public pageOptions: Array<Models.IPagination> = Config.StaticDataConfig.paginationOptions;
    public controlOptions: Array<Models.IControl> = Config.StaticDataConfig.control;
    public userCollection: Array<User> = [];
    public isLoaded: boolean = false;
    public paginationVisible: boolean = true;
    public selectedControl: string = 'pagination';
    public scrollStyle = {'height': 'auto'};
    public pageItems = 10;
    public configPagination: PaginationInstance = {
        id: 'pagination-control',
        itemsPerPage: 10,
        currentPage: 1
    };
    public curName$: string;
    public curAge$: Models.IAgeParam;
    @Input() userName: string;
    @Input() userAge: number;
    public nameSub: Subscription;
    public ageSub: Subscription;


    constructor(private dataService: DataService,
                private userService: UserService,
                private searchStore: SearchStore) {
    }

    public ngOnInit(): void {
        this.loadUsers();
        this.nameSub = this.searchStore.getDesiredName().subscribe(value => {
            this.curName$ = value;
        });
        this.ageSub = this.searchStore.getDesiredAge().subscribe(ageParam => {
            this.curAge$ = ageParam;
            this.configPagination.currentPage = 1;
        });
    }

    public loadUsers(): void {
        this.dataService.loadDataSource();
        this.dataService.getDataSource().subscribe(data => {
            this.userCollection = data;
            this.isLoaded = true;
        });
    }

    public onUserDeleted(id): void {
        this.dataService.remove(id);
    }

    public pageChanged($event: number) {
        this.configPagination.currentPage = $event;
    }

    public onPageItemsChange(value: number) {
        this.configPagination.itemsPerPage = value;
        this.configPagination.currentPage = 1;
    }

    public trackByFn(index: number, user: User) {
        return user.id;
    }

    public onControlChange() {
        this.paginationVisible = !this.paginationVisible;
        if (this.selectedControl === 'scroll') {
            this.scrollStyle = {'height': '650px'};
            this.configPagination = {itemsPerPage: null, currentPage: null};
        } else {
            this.scrollStyle = {'height': 'auto'};
            this.configPagination = {itemsPerPage: this.pageItems, currentPage: 1};
        }
    }

    public ngOnDestroy(): void {
        this.nameSub.unsubscribe();
        this.ageSub.unsubscribe();
    }
}
