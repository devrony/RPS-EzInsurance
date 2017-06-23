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
using System.Linq.Expressions;

namespace EzInsurance.DAL.Repositories
{
    public class PolicyRepository : Repository<Policy>, IPolicyRepository
    {
        #region Private Properties

        private ApplicationDbContext AppContext
        {
            get { return (ApplicationDbContext)base.Context; }
        }

        #endregion


        #region Constructors

        public PolicyRepository(ApplicationDbContext context) : base(context)
        {

        }

        #endregion


        #region Public Methods

        public IEnumerable<Policy> GetBySearch(string term)
        {
            // Future: Build up LINQ statement to search based on specific properties
            // This is example of adding additional repo methods.
            // Other option is to use external search/index frameworks/services 
            // such as WebSOLR, Azure Search, etc to perform much faster index searches
            // REF: https://www.websolr.com/
            // REF: https://azure.microsoft.com/en-us/services/search/

            return this.AppContext.Policies
                .Where
                (e => 
                    e.PrimaryInsuredName.Contains(term) || 
                    e.Number.Contains(term) ||
                    e.RiskAddress.Street1.Contains(term)
                    // FUTURE: Add additional props
                 )
                .OrderByDescending(c => c.DateModified)
                .ToList();
        }

        public IEnumerable<Policy> GetAllWithDetails()
        {
            return this.AppContext.Policies
                .Include(p => p.PrimaryInsuredAddress)
                .Include(p => p.PrimaryInsuredMailingAddress)
                .Include(p => p.RiskAddress)
                .Include(p => p.RiskConstructionType)
                .ToList();
        }

        public Policy GetSingleOrDefaultDetails(Expression<Func<Policy, bool>> predicate)
        {
            return this.AppContext.Policies
                .Include(p => p.PrimaryInsuredAddress)
                .Include(p => p.PrimaryInsuredMailingAddress)
                .Include(p => p.RiskAddress)
                .Include(p => p.RiskConstructionType)
                .SingleOrDefault(predicate);
        }

        #endregion
    }
}
