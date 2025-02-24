namespace SchoolRegister.Model.DataModels;
public class Teacher : User
{
    public string Title { get; set; } = null!;
    public virtual List<Subject> Subjects { get; set; } = new List<Subject>();
}