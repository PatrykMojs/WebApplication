using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.ViewModels.VM;
using SchoolRegister.Services.Interfaces;

namespace SchoolRegister.Services.ConcreteServices
{
    public class GradeService : BaseService, IGradeService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ILogger<GradeService> _logger;

        public GradeService(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<GradeService> logger,
            UserManager<User> userManager)
            : base(dbContext, mapper, logger)
        {
            _mapper = mapper;
            _logger = logger;
            _userManager = userManager;
        }

        public async Task<GradeVm> AddGradeToStudentAsync(AddGradeToStudentVm addGradeToStudentVm, int teacherId)
        {
            var teacher = await _userManager.FindByIdAsync(teacherId.ToString());
            if (teacher == null || !await _userManager.IsInRoleAsync(teacher, "Teacher"))
            {
                throw new UnauthorizedAccessException("Only teachers can add grades.");
            }

            var student = DbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == addGradeToStudentVm.StudentId);
            var subject = DbContext.Subjects.FirstOrDefault(s => s.Id == addGradeToStudentVm.SubjectId);
            if (student == null || subject == null || subject.TeacherId != teacherId)
            {
                throw new ArgumentException("Invalid student or subject ID, or unauthorized access.");
            }

            if (!Enum.IsDefined(typeof(GradeScale), addGradeToStudentVm.GradeValue))
            {
                throw new ArgumentException("Invalid grade value.");
            }

            var grade = new Grade
            {
                DateOfIssue = DateTime.UtcNow,
                GradeValue = (GradeScale)addGradeToStudentVm.GradeValue,
                StudentId = student.Id,
                SubjectId = subject.Id
            };
            
            DbContext.Grades.Add(grade);
            DbContext.SaveChanges();
            return _mapper.Map<GradeVm>(grade);
        }

        public GradesReportVm GetGradesReportForStudent(GetGradesReportVm getGradesVm, int userId, string userRole)
        {
            var student = DbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == getGradesVm.StudentId);
            if (student == null)
            {
                throw new ArgumentException("Student not found.");
            }

            if (userRole == "Parent")
            {
                var parent = DbContext.Users.OfType<Parent>().FirstOrDefault(p => p.Id == userId);
                if (parent == null || !parent.Students.Contains(student))
                {
                    throw new UnauthorizedAccessException("You can only view grades for your children.");
                }
            }
            else if (userRole == "Student" && student.Id != userId)
            {
                throw new UnauthorizedAccessException("You can only view your own grades.");
            }

            var grades = DbContext.Grades.Where(g => g.StudentId == student.Id).ToList();
            return new GradesReportVm
            {
                StudentId = student.Id,
                StudentName = student.FirstName + " " + student.LastName,
                Grades = _mapper.Map<List<GradeVm>>(grades)
            };
        }
    }
}
