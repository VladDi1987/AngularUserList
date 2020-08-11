import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.model';


@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {

    public form: FormGroup;
    public submitted = false;
    @Input() public isEdit: false;
    @Input() public data: User;
    @Input() id: number;

    constructor(public modalRef: BsModalRef,
                private dataService: DataService,
                private modalService: BsModalService,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        (this.isEdit)
            ? this.activateUserForm(this.data.firstName, this.data.lastName, this.data.age, this.data.email)
            : this.activateUserForm();
    }

    public activateUserForm(firstName?, lastName?, age?, email?): void {
        this.form = this.formBuilder.group({
            firstName: [firstName, [Validators.required]],
            lastName: [lastName, [Validators.required]],
            age: [age, [Validators.required, Validators.min(1), Validators.max(100)]],
            email: [email, [Validators.required, Validators.email]]
        });
    }

    get f() {
        return this.form.controls;
    }

    public updateUser(): void {
        const userData = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            email: this.form.value.email,
            age: +this.form.value.age,
            selected: this.data.selected
        };
        this.dataService.updateUser(this.id, userData);
        this.modalRef.hide();
    }

    public addUser(): void {
        const userData = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            email: this.form.value.email,
            age: +this.form.value.age,
            selected: false
        };
        const user: User = new User(userData);
        this.dataService.addUser(user);
        this.modalRef.hide();
    }

    public onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        (this.isEdit) ? this.updateUser() : this.addUser();
    }
}
