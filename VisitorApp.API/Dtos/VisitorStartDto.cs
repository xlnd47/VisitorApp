using System;
using System.ComponentModel.DataAnnotations;
using VisitorApp.API.Models;

namespace VisitorApp.API.Dtos
{
    public class VisitorStartDto
    {
        [Required]
        [EnumDataType(typeof(VisitType))]
        public VisitType VisitType { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 2, ErrorMessage = "Please enter a valid first name")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(32, MinimumLength = 4, ErrorMessage = "Please enter a valid last name")]
        public string LastName { get; set; }
        public string Company { get; set; }
        public string NumberPlate { get; set; }
    }
}