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
    public class RiskConstructionType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        #region Navigation Properties

        public virtual ICollection<Policy> Policies { get; set; }

        #endregion
    }
}
