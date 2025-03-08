using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    // [Authorize(Roles = "Admin")]
    [Route("Student")]
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly IGroupService _groupService;
        // private readonly IParentService _parentService;
        private readonly ILogger<StudentController> _logger;

        public StudentController(IStudentService studentService, IGroupService groupService, ILogger<StudentController> logger)
        {
            _studentService = studentService;
            _groupService = groupService;
            _logger = logger;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var students = _studentService.GetStudents();
            
            if (students == null || !students.Any())
            {
                return View(new List<StudentVm>());
            }
            return View(students);
        }

        [HttpGet("Create")]
        public IActionResult Create()
        {
            ViewBag.Groups = new SelectList(_groupService.GetGroups(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(CreateStudentVm model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Groups = new SelectList(_groupService.GetGroups(), "Id", "Name");
                // ViewBag.Parents = new SelectList(_parentService.GetParents(), "Id", "FullName");
                return View(model);
            }

            _studentService.AddStudent(model);
            return RedirectToAction("Index");
        }

        [HttpGet("Student/Edit/{id}")]
        public IActionResult Edit(int id)
        {
            var student = _studentService.GetStudent(s => s.Id == id);

            if(student == null)
            {
                return NotFound($"Student {id} not found");
            }

            return View(student);
        }

        [HttpPost("Student/Edit/{id}")]
        public IActionResult Edit(int id, StudentVm studentVm)
        {
            if(!ModelState.IsValid)
            {
                return View(studentVm);
            }

            var student = _studentService.GetStudent(s => s.Id == id);
            if(student == null)
            {
                return NotFound("Student not found");
            }

            student.FirstName = studentVm.FirstName;
            student.LastName = studentVm.LastName;
            student.GroupId = studentVm.GroupId;

            _studentService.UpdateStudent(student);

            return RedirectToAction("Index");
        }

        [HttpGet]
        [Route("Details/{id}")]
        public IActionResult Details(int id)
        {
            var student = _studentService.GetStudent(s => s.Id == id);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            return View(student);
        }

        [HttpGet]
        [Route("{id}/grades")]
        public IActionResult GetStudentGrades(int id)
        {
            var gradesReport = _studentService.GetGradesReport(new GetGradesReportVm { StudentId = id });

            if (gradesReport == null)
            {
                Console.WriteLine($"❌ Brak ocen dla studenta o ID {id}.");
                _logger.LogWarning($"Brak ocen dla studenta o ID {id}.");
                return RedirectToAction("Index");
            }

            return View(gradesReport);
        }

        [Authorize(Roles = "Admin,Teacher")]
        [HttpPost]
        [Route("assign-to-group")]
        public IActionResult AssignStudentToGroup([FromBody] AttachDetachStudentToGroupVm model)
        {
            var student = _studentService.AttachStudentToGroup(model);
            if (student == null)
            {
                Console.WriteLine("❌ Nie udało się przypisać studenta do grupy.");
                _logger.LogWarning("Nie udało się przypisać studenta do grupy.");
                return BadRequest("Błąd przypisania studenta do grupy.");
            }

            return RedirectToAction("Index");
        }
    }
}
