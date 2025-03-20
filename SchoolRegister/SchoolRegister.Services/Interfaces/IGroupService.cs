using SchoolRegister.ViewModels.VM;
using System.Collections.Generic;
using System.Linq.Expressions;
using SchoolRegister.Model.DataModels;

namespace SchoolRegister.Services.Interfaces
{
    public interface IGroupService
    {
        GroupVm AddOrUpdateGroup(AddOrUpdateGroupVm addOrUpdateGroupVm);
        StudentVm AttachStudentToGroup(AttachDetachStudentToGroupVm attachStudentToGroupVm);
        IEnumerable<GroupVm> GetGroups();
        GroupVm GetGroup(Expression<Func<Group, bool>> filterPredicate);
        IEnumerable<StudentVm> GetAvailableStudents();
        void AssignSubjectToGroup(AssignSubjectToGroupVm model);
        void DeleteGroup(int groupId);
    }
}
