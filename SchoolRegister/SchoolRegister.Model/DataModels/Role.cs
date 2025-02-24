using Microsoft.AspNetCore.Identity;

namespace SchoolRegister.Model.DataModels;
public class Role : IdentityRole<int>
{
    public int Id { get; set; }
    public RoleValue RoleValue { get; set; }

    public Role() : base() { }
    public Role(string roleName) : base(roleName) { }
}
