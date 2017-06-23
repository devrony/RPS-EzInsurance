// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

export class Address {

    public id: number;
    public street1: string;
    public street2: string;
    public city: string;
    public state: string;
    public zipCode: string;

    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: number, street1?: string, street2?: string, city?: string, state?: string, zipCode?: string) {

        this.id = id;
        this.street1 = street1;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
