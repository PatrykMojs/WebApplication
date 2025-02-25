using System.ComponentModel.DataAnnotations;
namespace SchoolRegister.ViewModels.VM;
public class TeacherVm
{
    public int Id { get; set; }
        
    [Required]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "First name must be between 2 and 100 characters.")]
    public string FirstName { get; set; }
        
    [Required]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Last name must be between 2 and 100 characters.")]
    public string LastName { get; set; }
        
    public string FullName => $"{FirstName} {LastName}";
        
    public string Title { get; set; }
        
    public List<int> SubjectIds { get; set; } = new List<int>();
    public List<string> SubjectNames { get; set; } = new List<string>();
}