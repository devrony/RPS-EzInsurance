// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../services/utilities';
import { Address } from '../../models/address.model';
import { AddressEdit } from '../../models/address-edit.model';

@Component({
    selector: 'address-info',
    templateUrl: './address-info.component.html',
    styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent implements OnInit {
    private isNewAddress = false;
    private isSaving = false;
    private isEditingSelf = false;
    private formResetToggle = true;
    private uniqueId: string = Utilities.uniqueId();
    private address: Address = new Address();

    public changesSavedCallback: () => void;
    public changesFailedCallback: () => void;
    public changesCancelledCallback: () => void;

    @Input()
    isViewOnly: boolean;

    @Input()
    isEditMode = false;

    @Input()
    addressEdit: AddressEdit;

    @Input()
    isGeneralEditor = false;

    @Input()
    addressType: string;

    @Input()
    showValidationErrors: boolean;

    @Input()
    formSubmitted: boolean;

    @ViewChild('f')
    private form;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
    }

    private edit() {
        if (!this.isGeneralEditor) {
            this.isEditingSelf = true;
            this.addressEdit = new AddressEdit();
            Object.assign(this.addressEdit, this.address);
        }
        else {
            if (!this.addressEdit)
                this.addressEdit = new AddressEdit();
        }

        this.isEditMode = true;
        this.showValidationErrors = true;
    }


    private save() {
        this.isSaving = true;
        this.alertService.startLoadingMessage("Saving changes...");

        //if (this.isNewAddress) {
        //    this.policyService.newPolicy(this.addressEdit).subscribe(policy => this.saveSuccessHelper(policy), error => this.saveFailedHelper(error));
        //}
        //else {
        //    this.policyService.updatePolicy(this.addressEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
        //}
    }


    private saveSuccessHelper(address?: Address) {

        if (address)
            Object.assign(this.addressEdit, address);

        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.showValidationErrors = false;

        Object.assign(this.address, this.addressEdit);
        this.addressEdit = new AddressEdit();
        this.resetForm();


        if (this.isGeneralEditor) {
            if (this.isNewAddress)
                this.alertService.showMessage("Success", `Address was created successfully`, MessageSeverity.success);
            else if (!this.isEditingSelf)
                this.alertService.showMessage("Success", `Changes to address was saved successfully`, MessageSeverity.success);
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
            this.addressEdit = this.address = new AddressEdit();
        else
            this.addressEdit = new AddressEdit();

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
        this.addressEdit = this.address = new AddressEdit();
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

    newAddress() {
        this.isGeneralEditor = true;
        this.isNewAddress = true;

        //this.editingPolicyNumber = null;
        this.address = this.addressEdit = new AddressEdit();
        this.edit();

        return this.addressEdit;
    }

    editAddress(address: Address) {
        if (address) {
            this.isGeneralEditor = true;
            this.isNewAddress = false;

            //this.editingPolicyNumber = policy.number;
            this.address = new Address();
            this.addressEdit = new AddressEdit();
            Object.assign(this.address, address);
            Object.assign(this.addressEdit, address);
            this.edit();

            return this.addressEdit;
        }
        else {
            return this.newAddress();
        }
    }

    displayAddress(address: Address) {

        this.address = new Address();
        Object.assign(this.address, address);
        this.isEditMode = false;
    }
}