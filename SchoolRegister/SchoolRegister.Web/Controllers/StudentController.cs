using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SchoolRegister.Web.Controllers
{
    [Route("Student")]
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly ILogger<StudentController> _logger;

        public StudentController(IStudentService studentService, ILogger<StudentController> logger)
        {
            _studentService = studentService;
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
