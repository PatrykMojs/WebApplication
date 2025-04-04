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
    public class GroupService : BaseService, IGroupService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<GroupService> _logger;

        public GroupService(ApplicationDbContext dbContext, IMapper mapper, ILogger<GroupService> logger)
            : base(dbContext, mapper, logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public GroupVm AddOrUpdateGroup(AddOrUpdateGroupVm addOrUpdateGroupVm)
        {
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == addOrUpdateGroupVm.Id) ?? new Group();
            group.Name = addOrUpdateGroupVm.Name;

            if (group.Id == 0)
                _dbContext.Groups.Add(group);

            _dbContext.SaveChanges();
            return _mapper.Map<GroupVm>(group);
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
            _dbContext.SaveChanges();
            return _mapper.Map<StudentVm>(student);
        }

        public IEnumerable<GroupVm> GetGroups()
        {
            var groups = _dbContext.Groups.ToList();
            return _mapper.Map<IEnumerable<GroupVm>>(groups);
        }

        public GroupVm GetGroup(Expression<Func<Group, bool>> filterPredicate)
        {
            var group = _dbContext.Groups.FirstOrDefault(filterPredicate);
            return group != null ? _mapper.Map<GroupVm>(group) : null;
        }

        public IEnumerable<StudentVm> GetAvailableStudents()
        {
            var students = _dbContext.Users.OfType<Student>().Where(s => s.GroupId == null).ToList();
            return _mapper.Map<IEnumerable<StudentVm>>(students);
        }

        public void AssignSubjectToGroup(AssignSubjectToGroupVm model)
        {
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == model.GroupId);
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == model.SubjectId);

            if (group == null || subject == null)
            {
                throw new ArgumentException("Nieprawidłowa grupa lub przedmiot.");
            }

            var subjectGroup = new SubjectGroup
            {
                GroupId = group.Id,
                SubjectId = subject.Id
            };

            _dbContext.SubjectGroups.Add(subjectGroup);
            _dbContext.SaveChanges();
        }


        public void DeleteGroup(int groupId)
        {
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new ArgumentException($"Grupa o ID {groupId} nie istnieje.");
            }

            var students = _dbContext.Users.OfType<Student>().Where(s => s.GroupId == groupId).ToList();
            foreach (var student in students)
            {
                student.GroupId = 0; 
            }

            var subjectGroups = _dbContext.SubjectGroups.Where(sg => sg.GroupId == groupId).ToList();
            _dbContext.SubjectGroups.RemoveRange(subjectGroups);
            _dbContext.Groups.Remove(group);
            _dbContext.SaveChanges();
        }
    }
}
