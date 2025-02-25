using System.ComponentModel.DataAnnotations;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.ViewModels.VM;

public class StudentVm
{
    public int Id { get; set; }
        
    [Required]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "First name must be between 2 and 100 characters.")]
    public string FirstName { get; set; }
        
    [Required]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Last name must be between 2 and 100 characters.")]
    public string LastName { get; set; }
        
    public string FullName => $"{FirstName} {LastName}";
        
    public int GroupId { get; set; }
    public string GroupName { get; set; }
        
    public int? ParentId { get; set; }
    public string ParentName { get; set; }
        
    public List<int> GradeIds { get; set; } = new List<int>();
    public Dictionary<string, double> AverageGradesPerSubject { get; set; } = new Dictionary<string, double>();
}