// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Address } from './address.model';
import { RiskConstructionType } from "./risk-construction-type.model";

export class Policy {

    public id: number;
    public number: string;
    public effectiveDate: string;
    public expirationDate: string;
    public primaryInsuredName: string;
    public riskYearBuilt: number;
    public primaryInsuredAddress: Address = new Address();
    public primaryInsuredMailingAddress: Address = new Address();
    public riskAddress: Address = new Address();
    public riskConstructionTypeId: number;
    public riskConstructionType = new RiskConstructionType();

    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: number, number?: string, primaryInsuredName?: string, effectiveDate?: string, expirationDate?: string, riskYearBuilt?: number, riskConstructionTypeId?: number) {

        this.id = id;
        this.number = number;
        this.primaryInsuredName = primaryInsuredName;
        this.effectiveDate = effectiveDate;
        this.expirationDate = expirationDate;
        this.riskYearBuilt = riskYearBuilt;
        this.riskConstructionTypeId = riskConstructionTypeId;
    }
}
