using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    [Authorize(Roles = "Admin,Teacher")]
    [ApiController]
    [Route("api/teachers")]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public IActionResult GetAllTeachers()
        {
            var teachers = _teacherService.GetTeachers();
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = _teacherService.GetTeacher(t => t.Id == id);
            if (teacher == null)
                return NotFound("Teacher not found.");
            return Ok(teacher);
        }

        [HttpGet("{id}/groups")]
        public IActionResult GetTeacherGroups(int id)
        {
            var groups = _teacherService.GetTeachersGroups(new TeachersGroupsVm { TeacherId = id });
            return Ok(groups);
        }
    }
}
