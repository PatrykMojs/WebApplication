namespace SchoolRegister.Model.DataModels;
public class Teacher : User
{
    public string Title { get; set; } = null!;
    public List<Subject> Subjects { get; set; } = new List<Subject>();
}