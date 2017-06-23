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
import { RiskConstructionTypeEndpoint } from './risk-construction-type-endpoint.service';
import { RiskConstructionType } from '../models/risk-construction-type.model';


@Injectable()
export class RiskConstructionTypeService {

    constructor(private router: Router, private http: Http, private authService: AuthService,
        private riskConstructionTypeEndpoint: RiskConstructionTypeEndpoint) {

    }

    getRiskConstructionType(riskConstructionTypeId: number) {

        return this.riskConstructionTypeEndpoint.getRiskConstructionTypeEndpoint(riskConstructionTypeId)
            .map((response: Response) => <RiskConstructionType>response.json());
    }

    getRiskConstructionTypes(page?: number, pageSize?: number) {

        return this.riskConstructionTypeEndpoint.getRiskConstructionTypesEndpoint(page, pageSize)
            .map((response: Response) => <RiskConstructionType[]>response.json());
    }
}