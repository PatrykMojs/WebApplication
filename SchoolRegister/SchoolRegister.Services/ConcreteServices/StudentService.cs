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
using SchoolRegister.Services.ConcreteServices;

namespace SchoolRegister.Services
{
    public class StudentService : BaseService, IStudentService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<StudentService> _logger;

        public StudentService(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<StudentService> logger)
            : base(dbContext, mapper, logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        public StudentVm GetStudent(Expression<Func<Student, bool>> filterPredicate)
        {
            var student = DbContext.Users.OfType<Student>().FirstOrDefault(filterPredicate);
            return student != null ? _mapper.Map<StudentVm>(student) : null;
        }

        public IEnumerable<StudentVm> GetStudents(Expression<Func<Student, bool>> filterPredicate = null)
        {
            var students = DbContext.Users.OfType<Student>().AsQueryable();
            if (filterPredicate != null)
            {
                students = students.Where(filterPredicate);
            }
            return _mapper.Map<IEnumerable<StudentVm>>(students.ToList());
        }
    }
}
