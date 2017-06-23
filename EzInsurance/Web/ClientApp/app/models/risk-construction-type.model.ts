// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

export class RiskConstructionType {

    public id: number;
    public name: string;
    public description: string;

    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: number, name?: string, description?: string) {

        this.id = id;
        this.name = name;
        this.description = description;
    }
}
