using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/groups")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public IActionResult GetAllGroups()
        {
            var groups = _groupService.GetGroups();
            return Ok(groups);
        }

        [HttpGet("{id}")]
        public IActionResult GetGroup(int id)
        {
            var group = _groupService.GetGroup(g => g.Id == id);
            if (group == null)
                return NotFound("Group not found.");
            return Ok(group);
        }

        [HttpPost("add-subject")]
        public IActionResult AttachSubjectToGroup([FromBody] AttachDetachSubjectGroupVm model)
        {
            var group = _groupService.AttachSubjectToGroup(model);
            return Ok(group);
        }

        [HttpPost("remove-subject")]
        public IActionResult DetachSubjectFromGroup([FromBody] AttachDetachSubjectGroupVm model)
        {
            var group = _groupService.DetachSubjectFromGroup(model);
            return Ok(group);
        }
    }
}
