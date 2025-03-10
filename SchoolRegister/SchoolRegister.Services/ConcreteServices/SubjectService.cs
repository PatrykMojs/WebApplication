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
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<SubjectService> _logger;

        public SubjectService(ApplicationDbContext dbContext, IMapper mapper, ILogger<SubjectService> logger)
            : base(dbContext, mapper, logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<SubjectVm> GetSubjects()
        {
            var subjects = _dbContext.Subjects.ToList();
            return _mapper.Map<IEnumerable<SubjectVm>>(subjects);
        }

        public SubjectVm GetSubject(int id)
        {
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == id);
            return _mapper.Map<SubjectVm>(subject);
        }

        public void AddSubject(CreateSubjectVm subjectVm)
        {
            if (subjectVm.TeacherId == null || !_dbContext.Users.OfType<Teacher>().Any(t => t.Id == subjectVm.TeacherId))
            {
                throw new ArgumentException("Podany nauczyciel nie istnieje w bazie danych.");
            }
            
            var subject = _mapper.Map<Subject>(subjectVm);
            _dbContext.Subjects.Add(subject);
            _dbContext.SaveChanges();
        }

        public void DeleteSubject(int id)
        {
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == id);
            if (subject != null)
            {
                _dbContext.Subjects.Remove(subject);
                _dbContext.SaveChanges();
            }
        }
    }
}
