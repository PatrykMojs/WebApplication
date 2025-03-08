using System.ComponentModel.DataAnnotations;

namespace SchoolRegister.ViewModels.VM
{
    public class CreateTeacherVm
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Imię musi mieć od 2 do 100 znaków.")]
        public string FirstName {get; set;}

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nazwisko musi mieć od 2 do 100 znaków.")]
        public string LastName {get; set;}

        [Required]
        public string Title {get; set;}

        [Required]
        public List<int> SubjectIds {get; set;} = new List<int>();

    }
}