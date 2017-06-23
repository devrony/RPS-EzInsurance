// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace EzInsurance.Web.ViewModels
{
    public class RiskConstructionTypeViewModel
    {
        public int Id { get; set; }

        [DisplayName("Name")]
        [Required(ErrorMessage = "Name is required"), StringLength(75, ErrorMessage = "Name must be at most 30 characters")]
        public string Name { get; set; }

        [DisplayName("Description")]
        public string Description { get; set; }
    }
}
