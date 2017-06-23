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
    public class PolicyViewModel
    {
        public int Id { get; set; }

        [DisplayName("Policy Number")]
        [Required(ErrorMessage = "Policy number is required"), StringLength(30, MinimumLength = 2, ErrorMessage = "Policy number must be between 2 and 30 characters")]
        public string Number { get; set; }

        [DisplayName("Primary Insured Name")]
        [Required(ErrorMessage = "Primary insured name is required"), StringLength(75, ErrorMessage = "Primary insured name must be at most 75 characters")]
        public string PrimaryInsuredName { get; set; }

        [DisplayName("Effective Date")]
        [DataType(DataType.Date, ErrorMessage = "Date not valid.")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public string EffectiveDate { get; set; }

        [DisplayName("Expiration Date")]
        [DataType(DataType.Date, ErrorMessage = "Date not valid.")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public string ExpirationDate { get; set; }

        [RegularExpression(@".*\d{4}.*", ErrorMessage = "Please enter a 4 digit year")]
        public int RiskYearBuilt { get; set; }

        public int RiskConstructionTypeId { get; set; }
        public RiskConstructionType RiskConstructionType { get; set; }

        public int PrimaryInsuredAddressId { get; set; }
        public AddressViewModel PrimaryInsuredAddress { get; set; }

        public int PrimaryInsuredMailingAddressId { get; set; }
        public AddressViewModel PrimaryInsuredMailingAddress { get; set; }

        public int RiskAddressId { get; set; }
        public AddressViewModel RiskAddress { get; set; }
    }
}
