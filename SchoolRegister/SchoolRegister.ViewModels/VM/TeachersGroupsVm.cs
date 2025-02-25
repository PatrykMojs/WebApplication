using System.ComponentModel.DataAnnotations;
namespace SchoolRegister.ViewModels.VM;
public class TeachersGroupsVm
{
    [Required]
    public int TeacherId { get; set; }
}