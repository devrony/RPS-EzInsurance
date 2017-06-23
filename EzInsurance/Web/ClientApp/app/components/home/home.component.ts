// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';

import { ConfigurationService } from '../../services/configuration.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [fadeInOut]
})
export class HomeComponent {
    constructor(private configurations: ConfigurationService) {

    }

    banner1 = require("../../assets/images/demo/banner1.png");
    banner2 = require("../../assets/images/demo/banner2.png");
    banner3 = require("../../assets/images/demo/banner3.png");
}
