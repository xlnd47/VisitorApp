using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorApp.API.Models;

namespace VisitorApp.API.Data
{
    public interface IVisitorRepository
    {
        Task<Visitor> BeginVisit(Visitor visitor);
        Task<Visitor> EndVisit(Visitor visitor);

        Task<Visitor> FindVisitor(string firstName, string LastName);
        Task<Visitor> FindVisitorById(int id);


        Task<List<Visitor>> LiveVisitors();

        Task<List<Visitor>> GetVisitorsToday();
        Task<List<Visitor>> GetVisitors();


    }
}