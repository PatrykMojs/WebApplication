using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Services.ConcreteServices
{
    public class TeacherService : BaseService, ITeacherService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ILogger<TeacherService> _logger;

        public TeacherService(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<TeacherService> logger,
            UserManager<User> userManager)
            : base(dbContext, mapper, logger)
        {
            _dbContext = dbContext;
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public TeacherVm GetTeacher(Expression<Func<Teacher, bool>> filterPredicate)
        {
            if (filterPredicate == null)
                throw new ArgumentNullException(nameof(filterPredicate));

            var teacher = _dbContext.Users.OfType<Teacher>()
                .Where(filterPredicate)
                .Select(t => new TeacherVm{
                    Id = t.Id,
                    FirstName = t.FirstName,
                    LastName = t.LastName,
                    Title = t.Title,
                    SubjectNames = t.Subjects.Select(s => s.Name).ToList()
                })
                .FirstOrDefault();

            return teacher != null ? _mapper.Map<TeacherVm>(teacher) : null;
        }

        public IEnumerable<TeacherVm> GetTeachers()
        {
            var teachersQuery = _dbContext.Users.OfType<Teacher>().ToList();
            return _mapper.Map<IEnumerable<TeacherVm>>(teachersQuery.ToList());
        }

        public IEnumerable<GroupVm> GetTeachersGroups(TeachersGroupsVm getTeachersGroups)
        {
            if (getTeachersGroups == null)
                throw new ArgumentNullException(nameof(getTeachersGroups));

            var teacher = _dbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Id == getTeachersGroups.TeacherId);
            if (teacher == null)
            {
                _logger.LogWarning($"Teacher with ID {getTeachersGroups.TeacherId} not found.");
                throw new ArgumentException("Teacher not found.");
            }

            var groups = teacher.Subjects
                .SelectMany(s => s.SubjectGroups.Select(sg => sg.Group))
                .Distinct()
                .ToList();

            return _mapper.Map<IEnumerable<GroupVm>>(groups);
        }

        public void AddTeacher(CreateTeacherVm teacherVm)
        {
            var teacher = _mapper.Map<Teacher>(teacherVm);
            var subjects = _dbContext.Subjects.Where(s => teacherVm.SubjectIds.Contains(s.Id)).ToList();
            teacher.Subjects = subjects;
            _dbContext.Users.Add(teacher);
            _dbContext.SaveChanges();
        }

        public void UpdateTeacher(TeacherVm teacherVm)
        {
            var teacher = _dbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Id == teacherVm.Id);
            if (teacher == null)
            {
                throw new ArgumentException($"Teacher id: {teacherVm.Id} not found");
            }

            teacher.FirstName = teacherVm.FirstName;
            teacher.LastName = teacherVm.LastName;
            teacher.Title = teacherVm.Title;

            var selectedSubjects = _dbContext.Subjects.Where(s => teacherVm.SubjectIds.Contains(s.Id)).ToList();
            teacher.Subjects = selectedSubjects;

            _dbContext.SaveChanges();
        }

        public void DeleteTeacher(int teacherId)
        {
            var teacher = _dbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Id == teacherId);
            if (teacher != null)
            {
                _dbContext.Users.Remove(teacher);
                _dbContext.SaveChanges();
            }
        }
    }
}
