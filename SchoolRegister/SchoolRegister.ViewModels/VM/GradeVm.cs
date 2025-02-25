namespace SchoolRegister.ViewModels.VM
{
    public class GradeVm
    {
        public int Id { get; set; }
        public int GradeValue { get; set; }
        public DateTime DateOfIssue { get; set; }
        public int StudentId { get; set; }
        public string StudentFullName { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public int TeacherId { get; set; }
        public string TeacherFullName { get; set; }
    }
}
