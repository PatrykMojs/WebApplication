using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SchoolRegister.ViewModels.VM
{
    public class ParentVm
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Imię musi mieć od 2 do 100 znaków.")]
        public string FirstName { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nazwisko musi mieć od 2 do 100 znaków.")]
        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public List<string> ChildrenNames { get; set; } = new List<string>();
    }
}
