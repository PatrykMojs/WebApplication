using AutoMapper;
using SchoolRegister.Model.DataModels;
using SchoolRegister.ViewModels.VM;
namespace SchoolRegister.Services.Configuration.AutoMapperProfiles;
public class MainProfile : Profile
{
    public MainProfile()
    {
        CreateMap<Subject, SubjectVm>()
            .ForMember(dest => dest.TeacherName, x => x.MapFrom(src => src.Teacher == null ? null : $"{src.Teacher.FirstName} {src.Teacher.LastName}"))
            .ForMember(dest => dest.Groups, x => x.MapFrom(src => src.SubjectGroups.Select(y => y.Group)));

        CreateMap<AddOrUpdateSubjectVm, Subject>();

        CreateMap<Group, GroupVm>()
            .ForMember(dest => dest.StudentCount, opt => opt.MapFrom(src => src.Students.Count));

        CreateMap<SubjectVm, AddOrUpdateSubjectVm>();

        CreateMap<Student, StudentVm>()
            .ForMember(dest => dest.GroupName, opt => opt.MapFrom(src => src.Group != null ? src.Group.Name : "Brak grupy"))
            .ForMember(dest => dest.ParentName, x => x.MapFrom(src => src.Parent == null ? null : $"{src.Parent.FirstName} {src.Parent.LastName}"));
        CreateMap<Grade, GradeVm>();

        CreateMap<Teacher, TeacherVm>()
            .ForMember(dest => dest.SubjectNames, opt => opt.MapFrom(src => src.Subjects.Select(s => s.Name).ToList()));
        
        CreateMap<Teacher, TeacherVm>().ReverseMap();
        CreateMap<CreateTeacherVm, Teacher>();

        CreateMap<Parent, ParentVm>()
            .ForMember(dest => dest.ChildrenNames, opt => opt.MapFrom(src => src.Students.Select(s => $"{s.FirstName} {s.LastName}").ToList()));
    }
}
