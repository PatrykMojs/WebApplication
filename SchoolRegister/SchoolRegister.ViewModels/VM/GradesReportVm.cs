namespace SchoolRegister.ViewModels.VM
{
    public class GradesReportVm
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public List<GradeVm> Grades { get; set; } = new List<GradeVm>();
        public Dictionary<string, List<GradeVm>> SubjectGrades { get; set; } = new Dictionary<string, List<GradeVm>>();
    }
}
