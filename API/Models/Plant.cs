using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class Plant
    {
        public int PlantId {get; set;}
        public string PlantName {get; set;}
        public string PlantSpeciesName {get; set;}
        public int PlantDifficultyLevel {get; set;}
        public string PlantPic {get; set;}
        public string PlantDescription {get; set;}
        public int PlantViews {get; set;}
        public int CreatedByAccountID {get; set;}
        public string PlantType {get; set;}
        
        public IPlantDataHandler dataHandler{get; set;}

        public Plant()
        {
            dataHandler = new PlantDataHandler();
        }
        

    }
}