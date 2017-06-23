using System;
using System.Collections.Generic;
using System.Text;

namespace EzInsurance.DAL.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Street1 { get; set; }
        public string Street2 { get; set; }
        public string City { get; set; }
        public string State { get; set; } // Acronym only (2 Chars)
        public string ZipCode { get; set; }


        #region Navigation Properties

        public virtual ICollection<Policy> PrimaryInsuredPolicies { get; set; }
        public virtual ICollection<Policy> PrimaryInsuredMailingPolicies { get; set; }
        public virtual ICollection<Policy> RiskPolicies { get; set; }

        #endregion
    }
}

