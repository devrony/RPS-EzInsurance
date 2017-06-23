using Microsoft.AspNetCore.Mvc;
using EzInsurance.DAL;
using EzInsurance.Web.ViewModels;
using AutoMapper;
using EzInsurance.DAL.Models;
using Microsoft.Extensions.Logging;
using EzInsurance.Web.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace EzInsurance.Web.Controllers
{
    [Route("api/[controller]")]
    public class RiskConstructionTypesController : ControllerBase
    {
        #region Constructors

        public RiskConstructionTypesController(IUnitOfWork unitOfWork, ILogger<RiskConstructionTypesController> logger)
        {
            this.UnitOfWork = unitOfWork;
            this.Logger = logger;
        }

        #endregion


        #region ActionResult Methods

        [HttpGet]
        [Produces(typeof(IEnumerable<RiskConstructionTypeViewModel>))]
        public IActionResult Get()
        {
            var models = this.UnitOfWork.RiskConstructionTypes.GetAll()
                .Select(e => Mapper.Map<RiskConstructionTypeViewModel>(e));

            return Ok(models);
        }

        [HttpGet]
        [Route("{id}")]
        [Produces(typeof(RiskConstructionTypeViewModel))]
        public IActionResult GetById(int id)
        {
            var entity = this.UnitOfWork.RiskConstructionTypes.GetSingleOrDefault(e => e.Id == id);

            if (entity == null)
                return NotFound();

            return Ok(Mapper.Map<RiskConstructionTypeViewModel>(entity));
        }

        #endregion
    }
}
