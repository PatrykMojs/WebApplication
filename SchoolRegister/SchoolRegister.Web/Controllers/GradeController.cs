using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    [Authorize(Roles = "Teacher")]
    [ApiController]
    [Route("api/grades")]
    public class GradeController : ControllerBase
    {
        private readonly IGradeService _gradeService;

        public GradeController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddGrade([FromBody] AddGradeToStudentVm model, int teacherId)
        {
            var grade = await _gradeService.AddGradeToStudentAsync(model, teacherId);
            return Ok(grade);
        }

        [HttpGet("report/{studentId}")]
        public IActionResult GetGradesReport(int studentId)
        {
            var report = _gradeService.GetGradesReportForStudent(new GetGradesReportVm { StudentId = studentId }, studentId, "Student");
            return Ok(report);
        }
    }
}
