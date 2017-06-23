// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { Permission, PermissionNames, PermissionValues } from '../models/permission.model';
import { PolicyEndpoint } from './policy-endpoint.service';
import { Policy } from '../models/policy.model';
import { PolicyEdit } from '../models/policy-edit.model';

@Injectable()
export class PolicyService {

    constructor(private router: Router, private http: Http, private authService: AuthService,
        private policyEndpoint: PolicyEndpoint) {

    }

    getPolicy(policyId: number) {

        return this.policyEndpoint.getPolicyEndpoint(policyId)
            .map((response: Response) => <Policy>response.json());
    }

    getPolicies(page?: number, pageSize?: number) {

        return this.policyEndpoint.getPoliciesEndpoint(page, pageSize)
            .map((response: Response) => <Policy[]>response.json());
    }

    getPoliciesDetails(page?: number, pageSize?: number) {

        return this.policyEndpoint.getPoliciesEndpointDetails(page, pageSize)
            .map((response: Response) => <Policy[]>response.json());
    }

    updatePolicy(policyEdit: PolicyEdit) {
        if (policyEdit.id) {
            return this.policyEndpoint.getUpdatePolicyEndpoint(policyEdit, policyEdit.id);
        }
    }

    newPolicy(policyEdit: PolicyEdit) {
        return this.policyEndpoint.getNewPolicyEndpoint(policyEdit)
            .map((response: Response) => <Policy>response.json());
    }

    deletePolicy(policyOrPolicyId: number | PolicyEdit): Observable<Policy> {

        if (typeof policyOrPolicyId === 'number' || policyOrPolicyId instanceof Number) {
            return this.policyEndpoint.getDeletePolicyEndpoint(<number>policyOrPolicyId)
                .map((response: Response) => <Policy>response.json());
        }
        else {

            if (policyOrPolicyId.id) {
                return this.deletePolicy(policyOrPolicyId.id);
            }
        }
    }

    userHasPermission(permissionValue: PermissionValues): boolean {
        return this.permissions.some(p => p == permissionValue);
    }


    get permissions(): PermissionValues[] {
        return this.authService.userPermissions;
    }
}
