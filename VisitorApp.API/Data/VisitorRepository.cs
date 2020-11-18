using System;
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
            var visitor = await _context.Visitors.FirstOrDefaultAsync(x => x.FirstName == firstName && x.LastName == LastName && x.VisitEnd == null);
            if (visitor == null)
                return null;

            return visitor;

        }
    }
}