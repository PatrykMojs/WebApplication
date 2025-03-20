using System.ComponentModel.DataAnnotations;

namespace SchoolRegister.ViewModels.VM
{
    public class AssignSubjectToGroupVm
    {
        public int GroupId { get; set; }

        [Required(ErrorMessage = "Wybierz przedmiot.")]
        public int SubjectId { get; set; }
    }
}
