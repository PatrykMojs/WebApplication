using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolRegister.Model.DataModels;
public class SubjectGroup
{
    [Key]
    [Column(Order = 1)]
    public int SubjectId { get; set; }
    public virtual Subject Subject { get; set; } = null!;

    [Key]
    [Column(Order = 2)]
    public int GroupId { get; set; }
    public virtual Group Group { get; set; } = null!;
}
