import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../../models/user.model';
import { DataService } from '../../../services/data.service';
import { UserFormComponent } from '../../../modals/user-form/user-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: '[app-user]',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

    @Input() user: User;
    @Input() trackBy: number;
    @Output() deleted = new EventEmitter<User>();
    public toGroups: FormGroup;
    public modalRef: BsModalRef;
    public isSelected: boolean = false;

    constructor(private modalService: BsModalService,
                private dataService: DataService) {
    }

    public ngOnInit(): void {
        this.initCellControls();
    }

    public initCellControls(): void {
        this.toGroups = new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            age: new FormControl(this.user.age, [Validators.required, Validators.min(1), Validators.max(100)]),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        });
    }

    public onSelectedRow(): void {
        this.isSelected = !this.isSelected;
        this.dataService.updateSelectedRows(this.isSelected, this.user.id);
    }

    public remove(id): void {
        this.deleted.emit(id);
    }

    public edit(id): void {
        const initialState = {
            isEdit: true,
            data: this.user,
            id
        };
        this.modalRef = this.modalService.show(UserFormComponent, {initialState});
    }

    public getControl(id: number, field: string): FormControl {
        return this.toGroups.get(field) as FormControl;
    }

    public updateField(id: number, field: string): void {
        const control = this.getControl(id, field);
        if (this.toGroups.invalid) {
            return;
        }
        this.dataService.updateCell(id, field, control);
    }

}
