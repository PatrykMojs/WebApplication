using SchoolRegister.ViewModels.VM;
using SchoolRegister.Model.DataModels;

namespace SchoolRegister.Services.Interfaces
{
    public interface IGradeService
    {
        Task<GradeVm> AddGradeToStudentAsync(AddGradeToStudentVm addGradeToStudentVm, int teacherId);
        GradesReportVm GetGradesReportForStudent(GetGradesReportVm getGradesVm, int userId, string userRole);
    }
}