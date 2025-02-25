namespace SchoolRegister.ViewModels.VM
{
    public class GetGradesReportVm
    {
        public int StudentId { get; set; }
        public bool IncludeSubjects { get; set; } = true; // Możliwość wyboru, czy raport zawiera przedmioty
    }
}
