import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

//       Component
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user-list/user/user.component';
import { EditableComponent } from './components/user-list/user/editable/editable.component';
import { UserFormComponent } from './modals/user-form/user-form.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

//       Service
import { UrlService } from './services/url.service';
import { UserService } from './services/user.service';
import { SearchStore } from './storage/search.store';
import { DataService } from './services/data.service';

//       Pipe
import { SearchByNamePipe } from './pipes/search-by-name.pipe';
import { SearchByAgePipe } from './pipes/search-by-age.pipe';


//     Directive
import { ViewModeDirective } from './components/user-list/user/editable/view-mode.directive';
import { EditModeDirective } from './components/user-list/user/editable/edit-mode.directive';
import { EditableOnEnterDirective } from './components/user-list/user/editable/editable-on-enter.directive';
import { FocusableDirective } from './directives/focusable.directive';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        UserListComponent,
        UserComponent,
        UserFormComponent,
        SearchByNamePipe,
        SearchByAgePipe,
        SpinnerComponent,
        EditableComponent,
        ViewModeDirective,
        EditModeDirective,
        EditableOnEnterDirective,
        FocusableDirective
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ToastContainerModule,
        NgxPaginationModule,
        VirtualScrollerModule
    ],
    entryComponents: [
        UserFormComponent
    ],
    providers: [
        BsModalService,
        UrlService,
        UserService,
        DataService,
        SearchStore
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}