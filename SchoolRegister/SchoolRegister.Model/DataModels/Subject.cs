namespace SchoolRegister.Model.DataModels;
public class Subject
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int TeacherId { get; set; }
    public Teacher Teacher { get; set; } = null!;
    public List<SubjectGroup> SubjectGroups { get; set; } = new List<SubjectGroup>();
    public List<Grade> Grades { get; set; } = new List<Grade>();
}