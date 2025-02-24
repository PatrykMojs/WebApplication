namespace SchoolRegister.Model.DataModels;
public class Grade
{
    public int Id { get; set; }
    public DateTime DateOfIssue { get; set; }
    public GradeScale GradeValue { get; set; }
    public int SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;
    public int StudentId { get; set; }
    public Student Student { get; set; } = null!;
}