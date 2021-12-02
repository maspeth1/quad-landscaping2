using System.Collections.Generic;
namespace API.Models.Interfaces
{
    public interface ISessions
    {
         public List<Session> Select();
         public void Delete(Session session);
         public void Update(Session session);
         public void Insert(Session session);
    }
}