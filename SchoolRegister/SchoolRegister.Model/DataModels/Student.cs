namespace SchoolRegister.Model.DataModels;
public class Student : User
{
    public int GroupId { get; set; }
    public virtual Group Group { get; set; } = null!;
    public int ParentId { get; set; }
    public virtual Parent? Parent { get; set; }
    public virtual List<Grade> Grades { get; set; } = new List<Grade>();

    public double AverageGrade => Grades.Any() ? Grades.Average(g => (int)g.GradeValue) : 0;

    public Dictionary<string, double> AverageGradePerSubject => Grades
        .GroupBy(g => g.Subject.Name)
        .ToDictionary(g => g.Key, g => g.Average(grade => (int)grade.GradeValue));

    public Dictionary<string, List<GradeScale>> GradesPerSubject => Grades
        .GroupBy(g => g.Subject.Name)
        .ToDictionary(g => g.Key, g => g.Select(grade => grade.GradeValue).ToList());
}