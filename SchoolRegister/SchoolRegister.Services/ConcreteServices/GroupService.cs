using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using SchoolRegister.DAL.EF;
using SchoolRegister.Model.DataModels;
using SchoolRegister.ViewModels.VM;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.Services.ConcreteServices;

namespace SchoolRegister.Services
{
    public class GroupService : BaseService, IGroupService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ILogger<GroupService> _logger;

        public GroupService(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<GroupService> logger,
            UserManager<User> userManager)
            : base(dbContext, mapper, logger)
        {
            _mapper = mapper;
            _logger = logger;
            _userManager = userManager;
        }

        public GroupVm AddOrUpdateGroup(AddOrUpdateGroupVm addOrUpdateGroupVm)
        {
            var group = DbContext.Groups.FirstOrDefault(g => g.Id == addOrUpdateGroupVm.Id) ?? new Group();
            group.Name = addOrUpdateGroupVm.Name;

            if (group.Id == 0)
                DbContext.Groups.Add(group);

            DbContext.SaveChanges();
            return _mapper.Map<GroupVm>(group);
        }

        public StudentVm AttachStudentToGroup(AttachDetachStudentToGroupVm attachStudentToGroupVm)
        {
            var student = DbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == attachStudentToGroupVm.StudentId);
            var group = DbContext.Groups.FirstOrDefault(g => g.Id == attachStudentToGroupVm.GroupId);
            
            if (student == null || group == null)
                throw new ArgumentException("Invalid student or group ID.");

            student.GroupId = group.Id;
            DbContext.SaveChanges();
            return _mapper.Map<StudentVm>(student);
        }

        public GroupVm AttachSubjectToGroup(AttachDetachSubjectGroupVm attachSubjectGroupVm)
        {
            var subjectGroup = new SubjectGroup
            {
                GroupId = attachSubjectGroupVm.GroupId,
                SubjectId = attachSubjectGroupVm.SubjectId
            };

            DbContext.SubjectGroups.Add(subjectGroup);
            DbContext.SaveChanges();
            return GetGroup(g => g.Id == attachSubjectGroupVm.GroupId);
        }

        public SubjectVm AttachTeacherToSubject(AttachDetachSubjectToTeacherVm attachDetachSubjectToTeacherVm)
        {
            var subject = DbContext.Subjects.FirstOrDefault(s => s.Id == attachDetachSubjectToTeacherVm.SubjectId);
            var teacher = DbContext.Users.OfType<Teacher>().FirstOrDefault(t => t.Id == attachDetachSubjectToTeacherVm.TeacherId);
            
            if (subject == null || teacher == null)
                throw new ArgumentException("Invalid subject or teacher ID.");

            subject.TeacherId = teacher.Id;
            DbContext.SaveChanges();
            return _mapper.Map<SubjectVm>(subject);
        }

        public StudentVm DetachStudentFromGroup(AttachDetachStudentToGroupVm detachStudentToGroupVm)
        {
            var student = DbContext.Users.OfType<Student>().FirstOrDefault(s => s.Id == detachStudentToGroupVm.StudentId);

            if (student == null)
                throw new ArgumentException("Invalid student ID.");

            student.GroupId = 0;
            DbContext.SaveChanges();
            return _mapper.Map<StudentVm>(student);
        }

        public GroupVm DetachSubjectFromGroup(AttachDetachSubjectGroupVm detachSubjectGroupVm)
        {
            var subjectGroup = DbContext.SubjectGroups
                .FirstOrDefault(sg => sg.GroupId == detachSubjectGroupVm.GroupId && sg.SubjectId == detachSubjectGroupVm.SubjectId);

            if (subjectGroup == null)
                throw new ArgumentException("Subject is not assigned to this group.");

            DbContext.SubjectGroups.Remove(subjectGroup);
            DbContext.SaveChanges();
            return GetGroup(g => g.Id == detachSubjectGroupVm.GroupId);
        }

        public SubjectVm DetachTeacherFromSubject(AttachDetachSubjectToTeacherVm detachSubjectToTeacherVm)
        {
            var subject = DbContext.Subjects.FirstOrDefault(s => s.Id == detachSubjectToTeacherVm.SubjectId);
            
            if (subject == null)
                throw new ArgumentException("Invalid subject ID.");

            subject.TeacherId = 0;
            DbContext.SaveChanges();
            return _mapper.Map<SubjectVm>(subject);
        }

        public GroupVm GetGroup(Expression<Func<Group, bool>> filterPredicate)
        {
            var group = DbContext.Groups.FirstOrDefault(filterPredicate);
            return group != null ? _mapper.Map<GroupVm>(group) : null;
        }

        public IEnumerable<GroupVm> GetGroups(Expression<Func<Group, bool>> filterPredicate = null)
        {
            var groups = DbContext.Groups.AsQueryable();
            if (filterPredicate != null)
            {
                groups = groups.Where(filterPredicate);
            }
            return _mapper.Map<IEnumerable<GroupVm>>(groups.ToList());
        }
    }
}
