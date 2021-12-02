using System.Collections.Generic;
namespace API.Models.Interfaces
{
    public interface IPlantDataHandler
    {
         public List<Plant> Select();
         public void Delete(Plant plant);
         public void Update(Plant plant);
         public void Insert(Plant plant);
    }
}