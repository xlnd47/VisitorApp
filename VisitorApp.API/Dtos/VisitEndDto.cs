using System.ComponentModel.DataAnnotations;

namespace VisitorApp.API.Dtos
{
    public class VisitEndDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}