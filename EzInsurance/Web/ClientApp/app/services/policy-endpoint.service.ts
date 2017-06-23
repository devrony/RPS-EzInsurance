// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class PolicyEndpoint extends EndpointFactory {

    private readonly _policiesUrl: string = "/api/policies";
    

    get policiesUrl() { return this.configurations.baseUrl + this._policiesUrl; }
    
    constructor(http: Http, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getPoliciesEndpoint(page?: number, pageSize?: number): Observable<Response> {

        let endpointUrl = page && pageSize ? `${this.policiesUrl}/${page}/${pageSize}` : this.policiesUrl;

        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getPoliciesEndpoint(page, pageSize));
            });
    }

    getPoliciesEndpointDetails(page?: number, pageSize?: number): Observable<Response> {

        let endpointUrl = page && pageSize ? `${this.policiesUrl}/${page}/${pageSize}` : this.policiesUrl + '/details';

        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getPoliciesEndpoint(page, pageSize));
            });
    }

    getPolicyEndpoint(policyId: number): Observable<Response> {

        let endpointUrl = `${this.policiesUrl}/${policyId}`;

        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getPolicyEndpoint(policyId));
            });
    }

    getNewPolicyEndpoint(policyObject: any): Observable<Response> {

        return this.http.post(this.policiesUrl, JSON.stringify(policyObject), this.getAuthHeader(true))
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getNewPolicyEndpoint(policyObject));
            });
    }

    getUpdatePolicyEndpoint(policyObject: any, policyId: number): Observable<Response> {

        let endpointUrl = `${this.policiesUrl}/${policyId}`;

        return this.http.put(endpointUrl, JSON.stringify(policyObject), this.getAuthHeader(true))
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getUpdatePolicyEndpoint(policyObject, policyId));
            });
    }

    getDeletePolicyEndpoint(policyId: number): Observable<Response> {
        let endpointUrl = `${this.policiesUrl}/${policyId}`;

        return this.http.delete(endpointUrl, this.getAuthHeader(true))
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getDeletePolicyEndpoint(policyId));
            });
    }

}