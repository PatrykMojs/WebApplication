namespace SchoolRegister.ViewModels.VM
{
    public class AddGradeToStudentVm
    {
        public int TeacherId { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public int GradeValue { get; set; }
        public DateTime DateOfIssue { get; set; } = DateTime.Now;
    }
}
