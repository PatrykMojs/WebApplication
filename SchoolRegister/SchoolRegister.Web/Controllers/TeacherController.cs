using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;
using SchoolRegister.Services.ConcreteServices;

namespace SchoolRegister.Web.Controllers
{
    // [Authorize(Roles = "Admin,Teacher")]
    // [ApiController]
    [Route("Teacher")]
    public class TeacherController : Controller
    {
        private readonly ITeacherService _teacherService;
        private readonly ISubjectService _subjectService;

        public TeacherController(ITeacherService teacherService, ISubjectService subjectService)
        {
            _teacherService = teacherService;
            _subjectService = subjectService;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var teachers = _teacherService.GetTeachers();

            if(teachers == null || !teachers.Any())
            {
                return View(new List<TeacherVm>());
            }
            return View(teachers);
        }

        [HttpGet]
        [Route("Create")]
        public IActionResult Create()
        {
            ViewBag.Subjects = new SelectList(_subjectService.GetSubjects(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult Create(CreateTeacherVm teacherVm)
        {
            if(ModelState.IsValid)
            {
                _teacherService.AddTeacher(teacherVm);
                return RedirectToAction("Index");

            }
            ViewBag.Subjects = new SelectList(_subjectService.GetSubjects(), "Id", "Name");
            return View(teacherVm);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public IActionResult Details(int id)
        {
            var teacher = _teacherService.GetTeacher(t => t.Id == id);
            if(teacher == null)
            {
                return NotFound("Nauczyciel nie istnieje.");
            }
            return View(teacher);
        }

        [HttpGet]
        [Route("Edit/{id}")]
        public IActionResult Edit(int id)
        {
            var teacher = _teacherService.GetTeacher(t => t.Id == id);
            if(teacher == null)
            {
                return NotFound("Nauczyciel nie istnieje");
            }

            ViewBag.Subjects = _subjectService.GetSubjects();
            return View(teacher);
        }

        [HttpPost]
        [Route("Edit/{id}")]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, TeacherVm teacherVm)
        {   
            if(id != teacherVm.Id)
            {
                return BadRequest("Invalid data");
            }
            
            if(ModelState.IsValid)
            {
                _teacherService.UpdateTeacher(teacherVm);
                return RedirectToAction("Index");
            }
            ViewBag.Subjects = _subjectService.GetSubjects();
            return View(teacherVm);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _teacherService.DeleteTeacher(id);
            return RedirectToAction("Index");
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            _teacherService.DeleteTeacher(id);
            return RedirectToAction("Index");
        }

        [HttpGet("{id}/groups")]
        public IActionResult GetTeacherGroups(int id)
        {
            var groups = _teacherService.GetTeachersGroups(new TeachersGroupsVm { TeacherId = id });
            return Ok(groups);
        }
    }
}
