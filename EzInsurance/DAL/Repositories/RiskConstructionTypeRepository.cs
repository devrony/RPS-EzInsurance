// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EzInsurance.DAL.Models;
using EzInsurance.DAL.Repositories.Interfaces;

namespace EzInsurance.DAL.Repositories
{
    public class RiskConstructionTypeRepository : Repository<RiskConstructionType>, IRiskConstructionTypeRepository
    {
        #region Private Properties

        private ApplicationDbContext AppContext
        {
            get { return (ApplicationDbContext)base.Context; }
        }

        #endregion


        #region Constructors

        public RiskConstructionTypeRepository(ApplicationDbContext context) : base(context)
        {

        }

        #endregion


        #region Public Methods

        // FUTURE: Add any addtional methods needed

        #endregion
    }
}
