import { Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, switchMapTo } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'editable',
    templateUrl: './editable.component.html',
    styleUrls: ['./editable.component.sass']
})

export class EditableComponent implements OnInit, OnDestroy {

    @ContentChild(ViewModeDirective, {static: false}) viewModeTpl: ViewModeDirective;
    @ContentChild(EditModeDirective, {static: false}) editModeTpl: EditModeDirective;
    @Output() update = new EventEmitter();
    editMode = new Subject();
    editMode$ = this.editMode.asObservable();

    public mode: 'view' | 'edit' = 'view';

    constructor(private host: ElementRef) {
    }

    public ngOnInit(): void {
        this.viewModeHandler();
        this.editModeHandler();
    }

    public toViewMode(): void {
        this.update.next();
        this.mode = 'view';
    }

    private get element() {
        return this.host.nativeElement;
    }

    private viewModeHandler(): void {
        fromEvent(this.element, 'dblclick').pipe(
            untilDestroyed(this)
        ).subscribe(() => {
            this.mode = 'edit';
            this.editMode.next(true);
        });
    }

    private editModeHandler(): void {
        const clickOutside$ = fromEvent(document, 'click').pipe(
            filter(({target}) => this.element.contains(target) === false),
            take(1)
        )
        this.editMode$.pipe(
            switchMapTo(clickOutside$),
            untilDestroyed(this)
        ).subscribe(event => this.toViewMode());
    }

    get currentView() {
        return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
    }

    public ngOnDestroy(): void {
    }

}
