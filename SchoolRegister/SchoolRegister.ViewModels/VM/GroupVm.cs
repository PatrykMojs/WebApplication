using System.ComponentModel.DataAnnotations;

namespace SchoolRegister.ViewModels.VM
{
    public class GroupVm
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nazwa klasy musi mieć od 2 do 100 znaków.")]
        public string Name { get; set; }

        public int StudentCount { get; set; }
    }
}
