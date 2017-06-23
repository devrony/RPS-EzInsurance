// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';//Todo: Change back to 'ng2-bootstrap/modal' when valorsoft fixes umd module

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from "../../services/app-translation.service";
import { PolicyService } from "../../services/policy.service";
import { Utilities } from "../../services/utilities";
import { Permission } from '../../models/permission.model';
import { Policy } from '../../models/policy.model';
import { PolicyEdit } from '../../models/policy-edit.model';
import { PolicyInfoComponent } from "./policy-info.component";


@Component({
    selector: 'policies-management',
    templateUrl: './policies-management.component.html',
    styleUrls: ['./policies-management.component.css']
})
export class PoliciesManagementComponent implements OnInit, AfterViewInit {

    columns: any[] = [];
    rows: Policy[] = [];
    rowsCache: Policy[] = [];
    editedPolicy: PolicyEdit;
    sourcePolicy: PolicyEdit;
    editingPolicyNumber: { name: string };
    loadingIndicator: boolean;

    @ViewChild('indexTemplate')
    indexTemplate: TemplateRef<any>;

    @ViewChild('actionsTemplate')
    actionsTemplate: TemplateRef<any>;

    @ViewChild('editorModal')
    editorModal: ModalDirective;

    @ViewChild('policyEditor')
    policyEditor: PolicyInfoComponent;

    constructor(private alertService: AlertService, private translationService: AppTranslationService, private policyService: PolicyService) {
    }

    ngOnInit() {

        let gT = (key: string) => this.translationService.getTranslation(key);

        this.columns = [
            { prop: "index", name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
            { prop: 'number', name: gT('policies.management.PolicyNumber'), width: 50 },
            { prop: 'primaryInsuredName', name: gT('policies.management.PrimaryInsuredName'), width: 90 },
            { prop: 'effectiveDate', name: gT('policies.management.EffectiveDate'), width: 120 },
            { prop: 'expirationDate', name: gT('policies.management.ExpirationDate'), width: 120}
        ];

        if (this.canManagePolicies)
            this.columns.push({ name: '', width: 130, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false });

        this.loadData();
    }

    addNewPolicyToList() {
        if (this.sourcePolicy) {
            Object.assign(this.sourcePolicy, this.editedPolicy);
            this.editedPolicy = null;
            this.sourcePolicy = null;
        }
        else {
            let user = new Policy();
            Object.assign(user, this.editedPolicy);
            this.editedPolicy = null;

            let maxIndex = 0;
            for (let u of this.rowsCache) {
                if ((<any>u).index > maxIndex)
                    maxIndex = (<any>u).index;
            }

            (<any>user).index = maxIndex + 1;

            this.rowsCache.splice(0, 0, user);
            this.rows.splice(0, 0, user);
        }
    }


    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        
        this.policyService.getPoliciesDetails().subscribe(policies => this.onDataLoadSuccessful(policies), error => this.onDataLoadFailed(error));
    }

    onDataLoadSuccessful(policies: Policy[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        policies.forEach((policy, index, users) => {
            (<any>policy).index = index + 1;
        });

        this.rowsCache = [...policies];
        this.rows = policies;
    }

    onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve policies from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    }

    ngAfterViewInit() {

        this.policyEditor.changesSavedCallback = () => {
            this.addNewPolicyToList();
            this.editorModal.hide();
        };

        this.policyEditor.changesCancelledCallback = () => {
            this.editedPolicy = null;
            this.sourcePolicy = null;
            this.editorModal.hide();
        };
    }

    onEditorModalHidden() {
        this.editingPolicyNumber = null;
        this.policyEditor.resetForm(true);
    }

    newPolicy() {
        this.editingPolicyNumber = null;
        this.sourcePolicy = null;
        this.editedPolicy = this.policyEditor.newPolicy();
        this.editorModal.show();
    }

    editPolicy(row: PolicyEdit) {
        this.editingPolicyNumber = { name: row.number };
        this.sourcePolicy = row;
        this.editedPolicy = this.policyEditor.editPolicy(row);
        this.editorModal.show();
    }

    deletePolicy(row: PolicyEdit) {
        this.alertService.showDialog('Are you sure you want to delete policy \"' + row.number + '\"?', DialogType.confirm, () => this.deletePolicyHelper(row));
    }


    deletePolicyHelper(row: PolicyEdit) {

        this.alertService.startLoadingMessage("Deleting...");
        this.loadingIndicator = true;

        this.policyService.deletePolicy(row)
            .subscribe(results => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.rowsCache = this.rowsCache.filter(item => item !== row)
                this.rows = this.rows.filter(item => item !== row)
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                    MessageSeverity.error, error);
            });
    }

    
    get canManagePolicies() {
        return this.policyService.userHasPermission(Permission.manageUsersPermission);
    }
}