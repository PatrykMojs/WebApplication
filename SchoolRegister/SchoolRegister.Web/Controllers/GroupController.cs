using Microsoft.AspNetCore.Mvc;
using SchoolRegister.Services.Interfaces;
using SchoolRegister.ViewModels.VM;

namespace SchoolRegister.Web.Controllers
{
    [Route("Group")]
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;
        private readonly IStudentService _studentService;

        public GroupController(IGroupService groupService, IStudentService studentService)
        {
            _groupService = groupService;
            _studentService = studentService;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var groups = _groupService.GetGroups();

            if (groups == null || !groups.Any())
            {
                return View(new List<GroupVm>());
            }
            return View(groups);
        }

        [HttpGet]
        [Route("AddOrUpdateGroup/{id?}")]
        public IActionResult AddOrUpdateGroup(int? id)
        {
            if (id.HasValue)
            {
                var groupVm = _groupService.GetGroup(g => g.Id == id.Value);
                if (groupVm == null)
                {
                    return NotFound();
                }
                return View(groupVm);
            }
            return View(new AddOrUpdateGroupVm());
        }

        [HttpPost]
        [Route("AddOrUpdateGroup")]
        public IActionResult AddOrUpdateGroup(AddOrUpdateGroupVm model)
        {
            if (ModelState.IsValid)
            {
                _groupService.AddOrUpdateGroup(model);
                return RedirectToAction("Index");
            }
            return View(model);
        }

        [HttpGet]
        [Route("AttachStudentToGroup/{groupId}")]
        public IActionResult AttachStudentToGroup(int groupId)
        {
            var group = _groupService.GetGroup(g => g.Id == groupId);
            if (group == null)
            {
                return NotFound("Grupa nie istnieje.");
            }

            var students = _studentService.GetStudents();
            if (students == null)
            {
                students = new List<StudentVm>();
            }
            ViewBag.Students = students;

            var model = new AttachDetachStudentToGroupVm
            {
                GroupId = groupId
            };

            return View(model);
        }

        [HttpPost]
        [Route("AttachStudentToGroup")]
        public IActionResult AttachStudentToGroup(AttachDetachStudentToGroupVm model)
        {
            if (ModelState.IsValid)
            {
                _groupService.AttachStudentToGroup(model);
                return RedirectToAction("Index");
            }

            var students = _studentService.GetStudents().Where(s => s.GroupName == null).ToList();
            ViewBag.Students = students;

            return View(model);
        }
    }
}
