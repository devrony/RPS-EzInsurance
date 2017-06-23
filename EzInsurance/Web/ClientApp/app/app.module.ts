// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TooltipModule } from "ng2-bootstrap/tooltip";
import { PopoverModule } from "ng2-bootstrap/popover";
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { PolicyService } from './services/policy.service';
import { PolicyEndpoint } from './services/policy-endpoint.service';
import { RiskConstructionTypeService } from './services/risk-construction-type.service';
import { RiskConstructionTypeEndpoint } from './services/risk-construction-type-endpoint.service';

import { EqualValidator } from './directives/equal-validator.directive';
import { LastElementDirective } from './directives/last-element.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
import { BootstrapToggleDirective } from './directives/bootstrap-toggle.directive';
import { BootstrapSelectDirective } from './directives/bootstrap-select.directive';
import { BootstrapDatepickerDirective } from './directives/bootstrap-datepicker.directive';
import { GroupByPipe } from './pipes/group-by.pipe';

import { AppComponent } from "./components/app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { PoliciesComponent } from "./components/policies/policies.component";
import { SettingsComponent } from "./components/settings/settings.component"
import { NotFoundComponent } from "./components/not-found/not-found.component";

import { NotificationsViewerComponent } from "./components/controls/notifications-viewer.component";
import { SearchBoxComponent } from "./components/controls/search-box.component";
import { UserInfoComponent } from "./components/controls/user-info.component";
import { UsersManagementComponent } from "./components/controls/users-management.component";
import { RolesManagementComponent } from "./components/controls/roles-management.component";
import { RoleEditorComponent } from "./components/controls/role-editor.component";
import { PoliciesManagementComponent } from "./components/controls/policies-management.component";
import { PolicyInfoComponent } from "./components/controls/policy-info.component";
import { AddressInfoComponent } from "./components/controls/address-info.component";



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLanguageLoader
            }
        }),
        NgxDatatableModule,
        ToastyModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SettingsComponent,
        UsersManagementComponent, UserInfoComponent,
        RolesManagementComponent, RoleEditorComponent,
        PoliciesManagementComponent, PoliciesComponent, PolicyInfoComponent,
        NotFoundComponent,
        NotificationsViewerComponent,
        SearchBoxComponent,
        AddressInfoComponent,
        EqualValidator,
        LastElementDirective,
        AutofocusDirective,
        BootstrapTabDirective,
        BootstrapToggleDirective,
        BootstrapSelectDirective,
        BootstrapDatepickerDirective,
        GroupByPipe
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AlertService,
        ConfigurationService,
        AppTitleService,
        AppTranslationService,
        NotificationService,
        NotificationEndpoint,
        AccountService,
        AccountEndpoint,
        PolicyService,
        PolicyEndpoint,
        RiskConstructionTypeService,
        RiskConstructionTypeEndpoint,
        LocalStoreManager,
        EndpointFactory
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
