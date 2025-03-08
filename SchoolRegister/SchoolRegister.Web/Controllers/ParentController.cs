using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    [Route("Parent")]
    public class ParentController : Controller
    {
        private readonly IParentService _parentService;

        public ParentController(IParentService parentService)
        {
            _parentService = parentService;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var parents = _parentService.GetParents();

            if (parents == null || !parents.Any())
            {
                return View(new List<ParentVm>());
            }
            return View(parents);
        }
    }
}
