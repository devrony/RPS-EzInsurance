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
export class RiskConstructionTypeEndpoint extends EndpointFactory {

    private readonly _resourceUrl: string = "/api/riskconstructiontypes";


    get resourceUrl() { return this.configurations.baseUrl + this._resourceUrl; }

    constructor(http: Http, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getRiskConstructionTypesEndpoint(page?: number, pageSize?: number): Observable<Response> {

        let endpointUrl = page && pageSize ? `${this.resourceUrl}/${page}/${pageSize}` : this.resourceUrl;

        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getRiskConstructionTypesEndpoint(page, pageSize));
            });
    }

    getRiskConstructionTypeEndpoint(policyId: number): Observable<Response> {

        let endpointUrl = `${this.resourceUrl}/${policyId}`;

        return this.http.get(endpointUrl, this.getAuthHeader())
            .map((response: Response) => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, () => this.getRiskConstructionTypeEndpoint(policyId));
            });
    }
}