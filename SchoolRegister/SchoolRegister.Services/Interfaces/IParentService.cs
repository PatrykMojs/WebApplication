using SchoolRegister.ViewModels.VM;
using System.Collections.Generic;
using System.Linq.Expressions;
using SchoolRegister.Model.DataModels;

namespace SchoolRegister.Services.Interfaces
{
    public interface IParentService
    {
        ParentVm GetParent(Expression<Func<Parent, bool>> filterPredicate);
        IEnumerable<ParentVm> GetParents();
        void AddParent(CreateParentVm parentVm);
        List<StudentVm> GetAvailableStudents();
    }
}
