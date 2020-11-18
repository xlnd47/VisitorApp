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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Company { get; set; }
        public string NumberPlate { get; set; }
    }
}