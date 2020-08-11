import { Directive, TemplateRef } from '@angular/core';

@Directive({
    exportAs: 'viewMode',
    selector: '[viewMode]'
})
export class ViewModeDirective {

    constructor(public tpl: TemplateRef<any>) { }

}
