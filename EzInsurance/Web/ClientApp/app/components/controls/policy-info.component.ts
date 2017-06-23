import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ConfigurationService } from '../../services/configuration.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { PolicyService } from "../../services/policy.service";
import { Utilities } from '../../services/utilities';
import { Policy } from '../../models/policy.model';
import { PolicyEdit } from '../../models/policy-edit.model';
import { BootstrapDatepickerDirective } from "../../directives/bootstrap-datepicker.directive";
import { BootstrapSelectDirective } from "../../directives/bootstrap-select.directive";
import { RiskConstructionTypeService } from "../../services/risk-construction-type.service";
import { RiskConstructionType } from "../../models/risk-construction-type.model";

@Component({
    selector: 'policy-info',
    templateUrl: './policy-info.component.html',
    styleUrls: ['./policy-info.component.css']
})
export class PolicyInfoComponent implements OnInit {

    private isEditMode = false;
    private isNewPolicy = false;
    private isSaving = false;
    private isEditingSelf = false;
    private showValidationErrors = false;
    private formResetToggle = true;
    private editingPolicyNumber: string;
    private uniqueId: string = Utilities.uniqueId();
    private policy: Policy = new Policy();
    private policyEdit: PolicyEdit;
    private primaryAddress = this.policy.primaryInsuredAddress;
    private mailingAddress = "Mailing";
    public riskConstructionTypes: RiskConstructionType[] = [];

    public changesSavedCallback: () => void;
    public changesFailedCallback: () => void;
    public changesCancelledCallback: () => void;

    @Input()
    isViewOnly: boolean;

    @Input()
    isGeneralEditor = false;

    @ViewChild('f')
    private form;

    @ViewChild('effectiveDatepicker')
    private effectiveDatepicker: BootstrapDatepickerDirective;

    @ViewChild('effectiveDatepicker')
    private expirationDatepicker: BootstrapDatepickerDirective;

    //ViewChilds Required because ngIf hides template variables from global scope
    @ViewChild('policyNumber')
    private policyNumber;

    @ViewChild('primaryInsuredName')
    private primaryInsuredName;

    @ViewChild('effectiveDate')
    private effectiveDate;

    @ViewChild('expirationDate')
    private expirationDate;

    @ViewChild('riskYearBuilt')
    private riskYearBuilt;

    riskConstructionTypeChangedSubscription: any;

    @ViewChild("riskConstructionTypeSelector")
    riskConstructionTypeSelector: BootstrapSelectDirective;

    constructor(private alertService: AlertService, private policyService: PolicyService, private riskConstructionTypeService: RiskConstructionTypeService) {
    }

    ngOnInit() {

        this.riskConstructionTypeService.getRiskConstructionTypes().subscribe(results => this.onRiskConstructionTypesDataLoadSuccessful(results), error => this.onRiskConstructionTypesDataLoadFail(error));
    }

    private onRiskConstructionTypesDataLoadSuccessful(types: RiskConstructionType[]) {
        this.alertService.stopLoadingMessage();
        this.riskConstructionTypes = types;
    }

    private onRiskConstructionTypesDataLoadFail(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Load Error", `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    }

    private edit() {
        if (!this.isGeneralEditor) {
            this.isEditingSelf = true;
            this.policyEdit = new PolicyEdit();
            Object.assign(this.policyEdit, this.policy);
        }
        else {
            if (!this.policyEdit)
                this.policyEdit = new PolicyEdit();
         }

        this.isEditMode = true;
        this.showValidationErrors = true;
    }

    private save() {
        this.isSaving = true;
        this.alertService.startLoadingMessage("Saving changes...");

        if (this.isNewPolicy) {
            this.policyService.newPolicy(this.policyEdit).subscribe(policy => this.saveSuccessHelper(policy), error => this.saveFailedHelper(error));
        }
        else {
            this.policyService.updatePolicy(this.policyEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
        }
    }

    private saveSuccessHelper(policy?: Policy) {

        if (policy) {
            //Convert Dates to short format before displaying on grid.
            var newDate = new Date(policy.effectiveDate);
            var mmStr = "";
            var ddStr = "";

            var mm = newDate.getMonth() + 1;
            if (mm < 10) {
                mmStr = "0";
            }
            mmStr += mm;

            var dd = newDate.getDate();
            if (dd < 10) {
                ddStr = "0";
            }
            ddStr += dd;
            policy.effectiveDate = mmStr + "/" + ddStr + "/" + newDate.getFullYear();

            newDate = new Date(policy.expirationDate);
            mmStr = "";
            ddStr = "";

            mm = newDate.getMonth() + 1;
            if (mm < 10) {
                mmStr = "0";
            }
            mmStr += mm;

            dd = newDate.getDate();
            if (dd < 10) {
                ddStr = "0";
            }
            ddStr += dd;
            policy.expirationDate = mmStr + "/" + ddStr + "/" + newDate.getFullYear();

            Object.assign(this.policyEdit, policy);
        }

        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.showValidationErrors = false;

        Object.assign(this.policy, this.policyEdit);
        this.policyEdit = new PolicyEdit();
        this.resetForm();


        if (this.isGeneralEditor) {
            if (this.isNewPolicy)
                this.alertService.showMessage("Success", `Policy \"${this.policy.number}\" was created successfully`, MessageSeverity.success);
            else if (!this.isEditingSelf)
                this.alertService.showMessage("Success", `Changes to policy \"${this.policy.number}\" was saved successfully`, MessageSeverity.success);
        }

        this.isEditMode = false;


        if (this.changesSavedCallback)
            this.changesSavedCallback();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);

        if (this.changesFailedCallback)
            this.changesFailedCallback();
    }

    private showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }

    private cancel() {
        if (this.isGeneralEditor)
            this.policyEdit = this.policy = new PolicyEdit();
        else
            this.policyEdit = new PolicyEdit();

        this.showValidationErrors = false;
        this.resetForm();

        this.alertService.showMessage("Cancelled", "Operation cancelled by policy", MessageSeverity.default);
        this.alertService.resetStickyMessage();

        if (!this.isGeneralEditor)
            this.isEditMode = false;

        if (this.changesCancelledCallback)
            this.changesCancelledCallback();
    }

    private close() {
        this.policyEdit = this.policy = new PolicyEdit();
        this.showValidationErrors = false;
        this.resetForm();
        this.isEditMode = false;

        if (this.changesSavedCallback)
            this.changesSavedCallback();
    }

    resetForm(replace = false) {

        if (!replace) {
            this.form.reset();
        }
        else {
            this.formResetToggle = false;

            setTimeout(() => {
                this.formResetToggle = true;
            });
        }
    }

    newPolicy() {
        this.isGeneralEditor = true;
        this.isNewPolicy = true;

        this.editingPolicyNumber = null;
        this.policy = this.policyEdit = new PolicyEdit();
        this.edit();

        return this.policyEdit;
    }

    editPolicy(policy: Policy) {
        if (policy) {
            this.isGeneralEditor = true;
            this.isNewPolicy = false;

            this.editingPolicyNumber = policy.number;
            this.policy = new Policy();
            this.policyEdit = new PolicyEdit();
            Object.assign(this.policy, policy);
            Object.assign(this.policyEdit, policy);
            this.edit();

            return this.policyEdit;
        }
        else {
            return this.newPolicy();
        }
    }

    displayPolicy(policy: Policy) {

        this.policy = new Policy();
        Object.assign(this.policy, policy);
        this.isEditMode = false;
    }
}