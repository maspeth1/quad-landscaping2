using System.Collections.Generic;
namespace API.Models.Interfaces
{
    public interface IAccountDataHandler
    {
         public List<Account> Select();
         public void Delete(Account account);
         public void Update(Account account);
         public void Insert(Account account);
    }
}