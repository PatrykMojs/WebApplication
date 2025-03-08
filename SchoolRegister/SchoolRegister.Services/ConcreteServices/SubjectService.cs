using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;
namespace SchoolRegister.Services.ConcreteServices
{
    public class SubjectService : BaseService, ISubjectService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<SubjectService> _logger;

        public SubjectService(ApplicationDbContext dbContext, IMapper mapper, ILogger<SubjectService> logger)
            : base(dbContext, mapper, logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<SubjectVm> GetSubjects()
        {
            var subjects = DbContext.Subjects.ToList();
            return _mapper.Map<IEnumerable<SubjectVm>>(subjects);
        }

        public SubjectVm GetSubject(int id)
        {
            var subject = DbContext.Subjects.FirstOrDefault(s => s.Id == id);
            return _mapper.Map<SubjectVm>(subject);
        }

        public void AddSubject(SubjectVm subjectVm)
        {
            var subject = _mapper.Map<Subject>(subjectVm);
            DbContext.Subjects.Add(subject);
            DbContext.SaveChanges();
        }

        public void DeleteSubject(int id)
        {
            var subject = DbContext.Subjects.FirstOrDefault(s => s.Id == id);
            if (subject != null)
            {
                DbContext.Subjects.Remove(subject);
                DbContext.SaveChanges();
            }
        }
    }
}
