using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VisitorApp.API.Models;

namespace VisitorApp.API.Data
{
    public class VisitorRepository : IVisitorRepository
    {
        private readonly DataContext _context;
        public VisitorRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<Visitor> BeginVisit(Visitor visitor)
        {
            await _context.Visitors.AddAsync(visitor);
            await _context.SaveChangesAsync();

            return visitor;
        }

        public async Task<Visitor> EndVisit(Visitor visitor)
        {
            visitor.VisitEnd = DateTime.UtcNow;

            _context.Update(visitor);
            await _context.SaveChangesAsync();

            return visitor;
        }

        public async Task<Visitor> FindVisitor(string firstName, string LastName)
        {
            var visitor = await _context.Visitors.FirstOrDefaultAsync(x => x.FirstName.ToLower() == firstName.ToLower() && x.LastName.ToLower() == LastName.ToLower() && x.VisitEnd == null);
            if (visitor == null)
                return null;

            return visitor;

        }

        public async Task<Visitor> FindVisitorById(int id)
        {
            var visitor = await _context.Visitors.FirstOrDefaultAsync(x => x.Id == id);
            return visitor;

        }



        public async Task<List<Visitor>> LiveVisitors()
        {

            var visitorsList = await _context.Visitors.ToListAsync();

            var visitors = visitorsList.Where(x => x.VisitEnd == null);

            return visitors.ToList();
        }

        public async Task<List<Visitor>> GetVisitors()
        {
            var visitors = await _context.Visitors.ToListAsync();

            return visitors;
        }

        public async Task<List<Visitor>> GetVisitorsToday()
        {
            var visitorsList = await _context.Visitors.ToListAsync();

            var visitors = visitorsList.Where(x => x.VisitBegin.Date == DateTime.Today.Date).ToList();

            return visitors;

        }
    }
}