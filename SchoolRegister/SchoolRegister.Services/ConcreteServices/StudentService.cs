using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.ViewModels.VM;
using SchoolRegister.Services.Interfaces;

namespace SchoolRegister.Services.ConcreteServices
{
    public class StudentService : BaseService, IStudentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<StudentService> _logger;

        public StudentService(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<StudentService> logger)
            : base(dbContext, mapper, logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public void AddStudent(CreateStudentVm studentVm)
        {
            var student = _mapper.Map<Student>(studentVm);
            _dbContext.Users.Add(student);
            _dbContext.SaveChanges();
        }

        public IEnumerable<StudentVm> GetStudents()
        {
            var students = _dbContext.Users.OfType<Student>().ToList();
            return _mapper.Map<IEnumerable<StudentVm>>(students);
        }

        public StudentVm GetStudent(Expression<Func<Student, bool>> filterPredicate)
        {
            var student = _dbContext.Users.OfType<Student>().FirstOrDefault(filterPredicate);
            return student != null ? _mapper.Map<StudentVm>(student) : null;
        }

        public IEnumerable<StudentVm> GetStudents(Expression<Func<Student, bool>> filterPredicate = null)
        {
            var students = _dbContext.Users.OfType<Student>().AsQueryable();
            if (filterPredicate != null)
            {
                students = students.Where(filterPredicate);
            }

            var studentList = students.ToList();
            return _mapper.Map<IEnumerable<StudentVm>>(studentList);
        }

        public GradesReportVm GetGradesReport(GetGradesReportVm getGradesVm)
        {
            var student = _dbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == getGradesVm.StudentId);
            if (student == null)
            {
                throw new ArgumentException("Student not found.");
            }

            var grades = _dbContext.Grades.Where(g => g.StudentId == student.Id).ToList();
            return new GradesReportVm
            {
                StudentId = student.Id,
                StudentName = student.FirstName + " " + student.LastName,
                Grades = _mapper.Map<List<GradeVm>>(grades)
            };
        }

        public StudentVm AttachStudentToGroup(AttachDetachStudentToGroupVm attachStudentToGroupVm)
        {
            var student = _dbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == attachStudentToGroupVm.StudentId);
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == attachStudentToGroupVm.GroupId);
            
            if (student == null || group == null)
            {
                throw new ArgumentException("Invalid student or group ID.");
            }

            student.GroupId = group.Id;
            DbContext.SaveChanges();
            return _mapper.Map<StudentVm>(student);
        }

        public void UpdateStudent(StudentVm studentVm)
        {
            var student = _dbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == studentVm.Id);

            if(student != null)
            {
                student.FirstName = studentVm.FirstName;
                student.LastName = studentVm.LastName;
                student.GroupId = studentVm.GroupId;

                _dbContext.SaveChanges();
            }
        }
    }
}
