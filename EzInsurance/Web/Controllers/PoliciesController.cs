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
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using EzInsurance.Web.ViewModels;
using AutoMapper;
using EzInsurance.DAL.Models;
using EzInsurance.DAL.Core.Interfaces;
using EzInsurance.Web.Policies;
using EzInsurance.Web.Helpers;
using Microsoft.AspNetCore.JsonPatch;
using EzInsurance.DAL.Core;
using EzInsurance.DAL;
using Microsoft.Extensions.Logging;

namespace EzInsurance.Web.Controllers
{
    // TODO: Finish the security
    //[Authorize(AuthPolicies.ManagePoliciesPolicy)]
    [Route("api/[controller]")]
    public class PoliciesController : ControllerBase
    {
        #region Private Constants

        private const string GetPolicyByIdActionName = "GetPolicyById";

        #endregion


        #region Constructors

        public PoliciesController(IUnitOfWork unitOfWork, ILogger<RiskConstructionTypesController> logger)
        {
            this.UnitOfWork = unitOfWork;
            this.Logger = logger;
        }

        #endregion


        #region ActionResult Methods

        [HttpGet]
        [Route("{id}")]
        [Produces(typeof(PolicyViewModel))]
        public IActionResult GetById(int id)
        {
            var entity = this.UnitOfWork.Policies.GetSingleOrDefault(e => e.Id == id);

            if (entity == null)
                return NotFound(id);

            return Ok(this.MapPolicyViewModel(entity));
        }

        [HttpGet]
        [Route("details/{id}")]
        [Produces(typeof(PolicyViewModel))]
        public IActionResult GetWithDetailsById(int id)
        {
            var entity = this.UnitOfWork.Policies.GetSingleOrDefaultDetails(e => e.Id == id);

            if (entity == null)
                return NotFound(id);
            
            return Ok(this.MapPolicyViewModel(entity));
        }

        [HttpGet]
        [Produces(typeof(IEnumerable<Policy>))]
        public IActionResult Get()
        {
            var models = this.UnitOfWork.Policies.GetAll()
                    .Select(e => this.MapPolicyViewModel(e));

            return Ok(models);
        }

        [HttpGet]
        [Route("details")]
        [Produces(typeof(IEnumerable<PolicyViewModel>))]
        public IActionResult GetAllWithDetails()
        {
            var models = this.UnitOfWork.Policies.GetAllWithDetails()
                .Select(e => this.MapPolicyViewModel(e));
            
            return Ok(models);
        }

        [HttpPost]
        public IActionResult CreatePolicy([FromBody] PolicyEditViewModel policyEditViewModel)
        {
            if (ModelState.IsValid)
            {
                if (policyEditViewModel == null)
                    return BadRequest($"{nameof(policyEditViewModel)} cannot be null");

                // Get associated RiskConstructionType
                if (policyEditViewModel.RiskConstructionTypeId > 0)
                {
                    var riskConstructionType = this.UnitOfWork.RiskConstructionTypes.GetSingleOrDefault(c => c.Id == policyEditViewModel.RiskConstructionTypeId);

                    policyEditViewModel.RiskConstructionType = riskConstructionType;
                }

                var policy = Mapper.Map<Policy>(policyEditViewModel);

                policy.DateCreated = DateTime.UtcNow;
                policy.DateModified = policy.DateCreated;
                policy.CreatedByUserId = this.User.Identity.Name;
                policy.ModifiedByUserId = policy.CreatedByUserId;

                this.UnitOfWork.Policies.Add(policy);

                this.UnitOfWork.SaveChanges();

                policyEditViewModel = Mapper.Map<PolicyEditViewModel>(policy);
             
                return CreatedAtAction(GetPolicyByIdActionName, new { id = policyEditViewModel.Id }, policyEditViewModel);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePolicy(int id, [FromBody] PolicyEditViewModel policyEditViewModel)
        {
            if (ModelState.IsValid)
            {
                if (policyEditViewModel == null)
                    return BadRequest($"{nameof(policyEditViewModel)} cannot be null");

                // Get associated RiskConstructionType
                if (policyEditViewModel.RiskConstructionTypeId > 0)
                {
                    var riskConstructionType = this.UnitOfWork.RiskConstructionTypes.GetSingleOrDefault(c => c.Id == policyEditViewModel.RiskConstructionTypeId);

                    policyEditViewModel.RiskConstructionType = riskConstructionType;
                }

                if (policyEditViewModel.Id != id)
                    return BadRequest("Conflicting policy id in parameter and model data");
                
                var policy = this.UnitOfWork.Policies.GetSingleOrDefaultDetails(e => e.Id == id);

                if (policy == null)
                    return NotFound(id);

                Mapper.Map<PolicyEditViewModel, Policy>(policyEditViewModel, policy);

                this.UnitOfWork.Policies.Update(policy);

                this.UnitOfWork.SaveChanges();
                
                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var policy = this.UnitOfWork.Policies.GetSingleOrDefaultDetails(e => e.Id == id);

            if (policy == null)
                return NotFound(id);

            this.UnitOfWork.Policies.Remove(policy);

            this.UnitOfWork.SaveChanges();

            return NoContent();
        }

        #endregion


        #region Private Methods

        private PolicyViewModel MapPolicyViewModel(Policy policy)
        {
            var viewModel = Mapper.Map<PolicyViewModel>(policy);

            viewModel.EffectiveDate = policy.EffectiveDate.ToString("MM/dd/yyyy");
            viewModel.ExpirationDate = policy.ExpirationDate.ToString("MM/dd/yyyy");

            return viewModel;
        }

        #endregion
    }
}
