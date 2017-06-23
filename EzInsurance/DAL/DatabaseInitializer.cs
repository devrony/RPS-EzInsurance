// ======================================
// Author: Devrony
// 
// Copyright (c) 2017
// 
//
// ======================================

using EzInsurance.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EzInsurance.DAL.Core;
using EzInsurance.DAL.Core.Interfaces;

namespace EzInsurance.DAL
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }
    
    public class DatabaseInitializer : IDatabaseInitializer
    {
        #region Private Fields

        private readonly ApplicationDbContext Context;
        private readonly IAccountManager AccountManager;
        private readonly ILogger Logger;

        #endregion


        #region Constructors

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            this.AccountManager = accountManager;
            this.Context = context;
            this.Logger = logger;
        }

        #endregion


        #region Seed Method

        public async Task SeedAsync()
        {
            // Migrate changes first
            await this.Context.Database.MigrateAsync().ConfigureAwait(false);

            #region Seed Roles/Users
            
            if (!await this.Context.Users.AnyAsync())
            {
                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await this.EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await this.EnsureRoleAsync(userRoleName, "Default user", new string[] { });

                await this.CreateUserAsync("admin", "tempP@ss123", "Inbuilt Administrator", "admin@ezinsurance.com", "+1 (123) 000-0000", new string[] { adminRoleName });
                await this.CreateUserAsync("user", "tempP@ss123", "Inbuilt Standard User", "user@ezinsurance.com", "+1 (123) 000-0001", new string[] { userRoleName });
            }

            #endregion

            #region Seed Risk Construction Types

            if (!await this.Context.RiskConstructionTypes.AnyAsync())
            {
                RiskConstructionType type1 = new RiskConstructionType
                {
                    Name = "Site Built Home",
                    Description = "Home built on site."
                };

                RiskConstructionType type2 = new RiskConstructionType
                {
                    Name = "Modular Home",
                    Description = "Home built off site in modular sections."
                };

                RiskConstructionType type3 = new RiskConstructionType
                {
                    Name = "Single Wide Manufactured Home",
                    Description = "Manufactured single wide home."
                };

                RiskConstructionType type4 = new RiskConstructionType
                {
                    Name = "Double Wide Manufactured Home",
                    Description = "Manufactured double wide home."
                };

                this.Context.RiskConstructionTypes.Add(type1);
                this.Context.RiskConstructionTypes.Add(type2);
                this.Context.RiskConstructionTypes.Add(type3);
                this.Context.RiskConstructionTypes.Add(type4);

                await this.Context.SaveChangesAsync();
            }

            #endregion


            /*
            if (!await this.Context.Customers.AnyAsync() && !await this.Context.ProductCategories.AnyAsync())
            {
                Customer cust_1 = new Customer
                {
                    Name = "Ebenezer Monney",
                    Email = "contact@ezinsurance.com",
                    Gender = Gender.Male,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_2 = new Customer
                {
                    Name = "Itachi Uchiha",
                    Email = "uchiha@narutoverse.com",
                    PhoneNumber = "+81123456789",
                    Address = "Some fictional Address, Street 123, Konoha",
                    City = "Konoha",
                    Gender = Gender.Male,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_3 = new Customer
                {
                    Name = "John Doe",
                    Email = "johndoe@anonymous.com",
                    PhoneNumber = "+18585858",
                    Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    City = "Lorem Ipsum",
                    Gender = Gender.Male,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Customer cust_4 = new Customer
                {
                    Name = "Jane Doe",
                    Email = "Janedoe@anonymous.com",
                    PhoneNumber = "+18585858",
                    Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    City = "Lorem Ipsum",
                    Gender = Gender.Male,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };



                ProductCategory prodCat_1 = new ProductCategory
                {
                    Name = "None",
                    Description = "Default category. Products that have not been assigned a category",
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };



                Product prod_1 = new Product
                {
                    Name = "BMW M6",
                    Description = "Yet another masterpiece from the world's best car manufacturer",
                    BuyingPrice = 109775,
                    SellingPrice = 114234,
                    UnitsInStock = 12,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Product prod_2 = new Product
                {
                    Name = "Nissan Patrol",
                    Description = "A true man's choice",
                    BuyingPrice = 78990,
                    SellingPrice = 86990,
                    UnitsInStock = 4,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };



                Order ordr_1 = new Order
                {
                    Discount = 500,
                    Cashier = await this.Context.Users.FirstAsync(),
                    Customer = cust_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_1.SellingPrice, Quantity=1, Product = prod_1 },
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };

                Order ordr_2 = new Order
                {
                    Cashier = await this.Context.Users.FirstAsync(),
                    Customer = cust_2,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };


                this.Context.Customers.Add(cust_1);
                this.Context.Customers.Add(cust_2);
                this.Context.Customers.Add(cust_3);
                this.Context.Customers.Add(cust_4);

                this.Context.Products.Add(prod_1);
                this.Context.Products.Add(prod_2);

                this.Context.Orders.Add(ordr_1);
                this.Context.Orders.Add(ordr_2);

                await this.Context.SaveChangesAsync();
            }

            */
        }

        #endregion


        #region Private Methods

        private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await this.AccountManager.GetRoleByNameAsync(roleName)) == null)
            {
                ApplicationRole applicationRole = new ApplicationRole(roleName, description);

                var result = await this.AccountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Item1)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
            }
        }

        private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            ApplicationUser applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            var result = await this.AccountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Item1)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");


            return applicationUser;
        }

        #endregion
    }
}
