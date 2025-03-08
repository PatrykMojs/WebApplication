using SchoolRegister.ViewModels.VM;
using SchoolRegister.Model.DataModels;
using System.Linq.Expressions;

namespace SchoolRegister.Services.Interfaces
{
    public interface ISubjectService
    {
        IEnumerable<SubjectVm> GetSubjects();
        SubjectVm GetSubject(int id);
        void AddSubject(SubjectVm subject);
        void DeleteSubject(int id);
    }
}