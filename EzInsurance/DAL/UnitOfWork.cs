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
using EzInsurance.DAL.Repositories;
using EzInsurance.DAL.Repositories.Interfaces;

namespace EzInsurance.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Private Backing Fields

        IPolicyRepository _policies;
        IRiskConstructionTypeRepository _riskConstructionTypes;

        #endregion


        #region Private Fields

        readonly ApplicationDbContext Context;
        
        #endregion


        #region Constructors

        public UnitOfWork(ApplicationDbContext context)
        {
            this.Context = context;
        }

        #endregion


        #region Public Properties

        public IPolicyRepository Policies
        {
            get
            {
                if (this._policies == null)
                    this._policies = new PolicyRepository(this.Context);

                return this._policies;
            }
        }

        public IRiskConstructionTypeRepository RiskConstructionTypes
        {
            get
            {
                if (this._riskConstructionTypes == null)
                    this._riskConstructionTypes = new RiskConstructionTypeRepository(this.Context);

                return this._riskConstructionTypes;
            }
        }

        #endregion


        #region Public Methods

        public int SaveChanges()
        {
            return this.Context.SaveChanges();
        }

        #endregion
    }
}
