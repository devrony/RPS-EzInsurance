// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace EzInsurance.DAL.Repositories.Interfaces
{
    public interface IPolicyRepository : IRepository<Policy>
    {
        IEnumerable<Policy> GetBySearch(string keyword);

        IEnumerable<Policy> GetAllWithDetails();

        Policy GetSingleOrDefaultDetails(Expression<Func<Policy, bool>> predicate);
    }
}
