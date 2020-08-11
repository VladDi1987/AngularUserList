import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserFormComponent } from '../../modals/user-form/user-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../models/user.model';
import { SearchStore } from '../../storage/search.store';

import * as Config from '../../configs/general-config';
import * as Models from '../../models/models';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    public modalRef: BsModalRef;
    public name: string;
    public ageOptions: Array<Models.IAgeParam> = Config.StaticDataConfig.ageOptions;
    public selectAgeParam: Models.IAgeParam = Config.StaticDataConfig.ageOptions[0];

    @Output() public readonly userEmitter = new EventEmitter<User>();

    constructor(private modalService: BsModalService,
                private searchStore: SearchStore,
                private userService: UserService,
                private dataService: DataService) {
    }

    public ngOnInit(): void {}

    public onAgeChange(): void {
        this.searchStore.setDesiredAge(this.selectAgeParam);
    }

    public nameFilter(): void {
        this.searchStore.setDesiredName(this.name);
    }

    public removeSelectedRows(): void {
        this.dataService.multipleDelete();
    }

    public showForm(): void {
        this.modalRef = this.modalService.show(UserFormComponent);
    }
}
