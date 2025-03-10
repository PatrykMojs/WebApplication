using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace SchoolRegister.ViewModels.VM
{
    public class CreateSubjectVm
    {
        [Required(ErrorMessage = "Nazwa przedmiotu jest wymagana.")]
        public string Name {get; set;}

        [Required]
        [Display(Name = "Nauczyciel prowadzący")]
        public int? TeacherId { get; set; }        
         public List<int> TeacherIds { get; set; } = new List<int>();
    }
}