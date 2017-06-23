// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OpenIddict;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EzInsurance.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DbSet<Policy> Policies { get; set; }
        public DbSet<RiskConstructionType> RiskConstructionTypes { get; set; }
        public DbSet<Address> Addresses { get; set; }
        

        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Policy>().Property(o => o.Number).IsRequired().HasMaxLength(30);
            builder.Entity<Policy>().Property(o => o.PrimaryInsuredName).IsRequired().HasMaxLength(75);
            builder.Entity<Policy>().HasOne(p => p.CreatedByUser).WithMany(p => p.CreatedByPolicies).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Policy>().HasOne(p => p.ModifiedByUser).WithMany(p => p.ModifiedByPolicies).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Policy>().HasOne(p => p.PrimaryInsuredAddress).WithMany(p => p.PrimaryInsuredPolicies).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Policy>().HasOne(p => p.PrimaryInsuredMailingAddress).WithMany(p => p.PrimaryInsuredMailingPolicies).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Policy>().HasOne(p => p.RiskAddress).WithMany(p => p.RiskPolicies).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Policy>().HasOne(p => p.RiskConstructionType).WithMany(p => p.Policies).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Address>().Property(o => o.Street1).IsRequired().HasMaxLength(100);
            builder.Entity<Address>().Property(o => o.Street2).HasMaxLength(100);
            builder.Entity<Address>().Property(o => o.City).IsRequired().HasMaxLength(100);
            builder.Entity<Address>().Property(o => o.State).IsRequired().HasMaxLength(2); // Acronym only
            builder.Entity<Address>().Property(o => o.ZipCode).IsRequired().HasMaxLength(10); //(5 digits, a hyphen, and 4 digits)

            builder.Entity<RiskConstructionType>().Property(o => o.Name).IsRequired().HasMaxLength(30);
        }
    }
}
