using System;
using System.Collections.Generic;
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
        private readonly IVisitorRepository _repository;
        public VisitorsController(IVisitorRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<IActionResult> GetVisitors()
        {
            var visitors = await _repository.GetVisitors();

            return Ok(visitors);
        }

        [HttpGet("live")]
        public async Task<IActionResult> GetLiveVisitors()
        {

            var visitors = await _repository.LiveVisitors();
            return Ok(visitors);
        }


        [AllowAnonymous]
        [HttpGet("types")]
        public IActionResult GetVisitTypes()
        {

            var visitVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(VisitType)))
            {
                visitVals.Add(new
                {
                    id = (int)item,
                    name = item.ToString()
                });
            }

            return Ok(visitVals);
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public async Task<IActionResult> AddVisitor(VisitorStartDto visitorStartDto)
        {
            var existingVistor = await _repository.FindVisitor(visitorStartDto.FirstName, visitorStartDto.LastName);
            if (existingVistor != null)
                return BadRequest("A vistitor with the same name already registered");

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
                return BadRequest("Couldn't find the visitor");


            return Ok(await _repository.EndVisit(findVisitor));
        }

        [HttpPost("end/{id}")]
        public async Task<IActionResult> EndVisitById(int id)
        {
            var findVisitor = await _repository.FindVisitorById(id);

            if (findVisitor == null)
                return BadRequest("Couldn't find the visitor");


            return Ok(await _repository.EndVisit(findVisitor));
        }



    }
}