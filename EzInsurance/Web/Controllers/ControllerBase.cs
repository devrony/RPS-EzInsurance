using Microsoft.AspNetCore.Mvc;
using EzInsurance.DAL;
using EzInsurance.Web.ViewModels;
using AutoMapper;
using EzInsurance.DAL.Models;
using Microsoft.Extensions.Logging;
using EzInsurance.Web.Helpers;

namespace EzInsurance.Web.Controllers
{
    public abstract class ControllerBase : Controller
    {
        #region Protected Fields

        protected IUnitOfWork UnitOfWork;
        protected ILogger Logger;

        #endregion
    }
}
