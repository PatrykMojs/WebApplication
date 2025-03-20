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
         private readonly IStudentService _studentService;

        public ParentController(IParentService parentService, IStudentService studentService)
        {
            _parentService = parentService;
            _studentService = studentService;
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

        [HttpGet]
        [Route("Create")]
        public IActionResult Create()
        {
            var students = _studentService.GetStudents().Where(s => s.ParentId == null).ToList();
            var model = new CreateParentVm
            {
                AvailableStudents = students
            };

            ViewBag.Students = students.Select(s => new { s.Id, FullName = $"{s.FirstName} {s.LastName}" });

            return View(model);
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult Create(CreateParentVm model)
        {
            if (ModelState.IsValid)
            {
                _parentService.AddParent(model);
                return RedirectToAction("Index");
            }

            var students = _studentService.GetStudents().Where(s => s.ParentId == null).ToList();
            ViewBag.Students = students.Select(s => new { s.Id, FullName = $"{s.FirstName} {s.LastName}" });

            return View(model);
        }
    }
}
