import { Directive, ElementRef } from '@angular/core';

@Directive({
    exportAs: 'focusable',
    selector: '[focusable]'
})
export class FocusableDirective {

    constructor(private host: ElementRef) { }

    public ngAfterViewInit(): void {
        this.host.nativeElement.focus();
    }

}
