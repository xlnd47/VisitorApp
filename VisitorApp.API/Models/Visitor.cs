using System;

namespace VisitorApp.API.Models
{
    public enum VisitType
    {
        visit,
        applicant,
        supplier
    }
    public class Visitor
    {
        public int Id { get; set; }
        public VisitType VisitType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string NumberPlate { get; set; }
        public DateTime VisitBegin { get; set; }
        public DateTime? VisitEnd { get; set; }
    }
}