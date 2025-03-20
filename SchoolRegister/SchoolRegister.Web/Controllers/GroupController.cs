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
        private readonly ISubjectService _subjectService;

        public GroupController(IGroupService groupService, IStudentService studentService, ISubjectService subjectService)
        {
            _groupService = groupService;
            _studentService = studentService;
            _subjectService = subjectService;
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
        [Route("AssignStudents")]
        [ValidateAntiForgeryToken]
        public IActionResult AssignStudents(AttachDetachStudentToGroupVm model)
        {
            if (ModelState.IsValid)
            {
                _groupService.AttachStudentToGroup(model);
                return RedirectToAction("Index");
            }

            ViewBag.Students = _studentService.GetStudents().Where(s => s.GroupName == null).ToList();
            return View(model);
        }

        [HttpPost]
        [Route("Delete/{id}")]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            try
            {
                _groupService.DeleteGroup(id);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Nie można usunąć tej klasy, ponieważ są do niej przypisani uczniowie.";
                return RedirectToAction("Index");
            }
        }

        [HttpGet]
        [Route("AssignSubject/{groupId}")]
        public IActionResult AssignSubject(int groupId)
        {
            var group = _groupService.GetGroup(g => g.Id == groupId);
            if (group == null)
            {
                return NotFound("Grupa nie istnieje.");
            }

            var subjects = _subjectService.GetSubjects();
            ViewBag.Subjects = subjects;

            var model = new AssignSubjectToGroupVm
            {
                GroupId = groupId
            };

            return View(model);
        }

        [HttpPost]
        [Route("AssignSubject")]
        [ValidateAntiForgeryToken]
        public IActionResult AssignSubject(AssignSubjectToGroupVm model)
        {
            if (ModelState.IsValid)
            {
                _groupService.AssignSubjectToGroup(model);
                return RedirectToAction("Index");
            }

            ViewBag.Subjects = _subjectService.GetSubjects();
            return View(model);
        }

        [HttpGet]
        [Route("Students/{id}")]
        public IActionResult Students(int id)
        {
            var group = _groupService.GetGroup(g => g.Id == id);
            if (group == null)
            {
                return NotFound("Grupa nie istnieje.");
            }

            var students = _studentService.GetStudents(s => s.GroupId == id);
            ViewBag.GroupName = group.Name;
            return View(students);
        }
    }
}
