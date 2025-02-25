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
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public TeacherVm GetTeacher(Expression<Func<Teacher, bool>> filterPredicate)
        {
            if (filterPredicate == null)
                throw new ArgumentNullException(nameof(filterPredicate));

            var teacher = DbContext.Users.OfType<Teacher>().FirstOrDefault(filterPredicate);
            return teacher != null ? _mapper.Map<TeacherVm>(teacher) : null;
        }

        public IEnumerable<TeacherVm> GetTeachers(Expression<Func<Teacher, bool>> filterPredicate = null)
        {
            var teachersQuery = DbContext.Users.OfType<Teacher>().AsQueryable();
            if (filterPredicate != null)
            {
                teachersQuery = teachersQuery.Where(filterPredicate);
            }
            return _mapper.Map<IEnumerable<TeacherVm>>(teachersQuery.ToList());
        }

        public IEnumerable<GroupVm> GetTeachersGroups(TeachersGroupsVm getTeachersGroups)
        {
            if (getTeachersGroups == null)
                throw new ArgumentNullException(nameof(getTeachersGroups));

            var teacher = DbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Id == getTeachersGroups.TeacherId);
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
    }
}
