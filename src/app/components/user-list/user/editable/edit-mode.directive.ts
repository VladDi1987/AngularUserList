import { Directive, TemplateRef } from '@angular/core';

@Directive({
    exportAs: 'editMode',
    selector: '[editMode]'
})
export class EditModeDirective {

    constructor(public tpl: TemplateRef<any>) { }

}
