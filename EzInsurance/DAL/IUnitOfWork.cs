// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EzInsurance.DAL
{
    public interface IUnitOfWork
    {
        IPolicyRepository Policies { get; }
        IRiskConstructionTypeRepository RiskConstructionTypes { get; }

        int SaveChanges();
    }
}
