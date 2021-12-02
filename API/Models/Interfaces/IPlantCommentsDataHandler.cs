using System.Collections.Generic;

namespace API.Models.Interfaces
{
    public interface IPlantCommentsDataHandler
    {
         public List<PlantComments> Select();
         public void Delete(PlantComments plantcomment);
         public void Update(PlantComments plantcomment);
         public void Insert(PlantComments plantcomment);
    }
}