using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitorApp.API.Data;
using VisitorApp.API.Dtos;
using VisitorApp.API.Models;

namespace VisitorApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IVisitorRepository _repository;
        public VisitorsController(IVisitorRepository repository, DataContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetVisitors()
        {
            var visitors = await _context.Visitors.ToListAsync();

            return Ok(visitors);
        }
        [AllowAnonymous]
        [HttpGet("types")]
        public IActionResult GetVisitTypes()
        {
            var visitTypes = Enum.GetNames(typeof(VisitType));

            return Ok(visitTypes);
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public async Task<IActionResult> AddVisitor(VisitorStartDto visitorStartDto)
        {
            var visitorToCreate = new Visitor
            {
                VisitType = visitorStartDto.VisitType,
                FirstName = visitorStartDto.FirstName,
                LastName = visitorStartDto.LastName,
                Company = visitorStartDto.Company,
                NumberPlate = visitorStartDto.NumberPlate,
                VisitBegin = DateTime.UtcNow
            };

            var createdVisitor = await _repository.BeginVisit(visitorToCreate);

            return StatusCode(201);
        }

        [AllowAnonymous]
        [HttpPost("end")]
        public async Task<IActionResult> EndVisit(VisitEndDto visitEndDto)
        {
            var findVisitor = await _repository.FindVisitor(visitEndDto.FirstName, visitEndDto.LastName);

            if (findVisitor == null)
                return NotFound();


            return Ok(await _repository.EndVisit(findVisitor));
        }
    }
}