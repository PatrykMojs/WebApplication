using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    // [Authorize(Roles = "Admin,Teacher")]
    [Route("Subject")]
    public class SubjectController : Controller
    {
        private readonly ISubjectService _subjectService;
        private readonly ITeacherService _teacherService;

        public SubjectController(ISubjectService subjectService, ITeacherService teacherService)
        {
            _subjectService = subjectService;
            _teacherService = teacherService;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var subjects = _subjectService.GetSubjects();
            return View(subjects);
        }

        [HttpGet]
        [Route("Create")]
        public IActionResult Create()
        {
            var teachers = _teacherService.GetTeachers();
            ViewBag.Teachers = new SelectList(teachers, "Id", "FullName");
            
            return View(new CreateSubjectVm());
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult Create(CreateSubjectVm model)
        {
            if (ModelState.IsValid)
            {
                _subjectService.AddSubject(model);
                return RedirectToAction("Index");
            }

            ViewBag.Teachers = new SelectList(_teacherService.GetTeachers(), "Id", "FullName");
            return View(model);
        }
    }
}
