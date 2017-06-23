// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using System;
using System.Collections.Generic;
using System.Text;

namespace EzInsurance.DAL.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public DateTime EffectiveDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string PrimaryInsuredName { get; set; }
        public int RiskYearBuilt { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }


        
        #region Navigation Properties

        public int PrimaryInsuredAddressId { get; set; }
        public Address PrimaryInsuredAddress { get; set; }

        public int PrimaryInsuredMailingAddressId { get; set; }
        public Address PrimaryInsuredMailingAddress { get; set; }

        public int RiskAddressId { get; set; }
        public Address RiskAddress { get; set; }

        public int? RiskConstructionTypeId { get; set; }
        public RiskConstructionType RiskConstructionType { get; set; }

        public string CreatedByUserId { get; set; }
        public ApplicationUser CreatedByUser { get; set; }

        public string ModifiedByUserId { get; set; }
        public ApplicationUser ModifiedByUser { get; set; }

        #endregion
    }
}
