using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class PlantDataHandler : IPlantDataHandler
    {
        private Database db;
        public PlantDataHandler()
        {
            db = new Database();
        }
        public void Delete(Plant plants)
        {
            string sql = "UPDATE plants SET deleted = 'Y' WHERE plantId = @plantid";

            var values = GetValues(plants);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(Plant plants)
        {
            string sql = "INSERT INTO plants (PlantName, PlantSpeciesName, PlantDifficultyLevel, PlantPic, PlantDescription, PlantViews, PlantCreatedByAccountID, PlantType)";
            sql += "VALUES (@plantname, @plantSpeciesname, @plantDifficultyLevel, @plantpic, @plantdescription, @plantviews, @createdbyaccountid, @plantType)";

            var values = GetValues(plants);
            db.Open();
            db.Insert(sql, values);
            db.Close();

        }

        public List<Plant> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM plants WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<Plant> plants = new List<Plant>();
            foreach(dynamic item in results)
            {
                Plant temp = new Plant(){
                    PlantId = item.plantId,
                    PlantName = item.plantName,
                    PlantSpeciesName = item.plantSpeciesName,
                    PlantDifficultyLevel = item.plantDifficultyLevel,
                    PlantPic = item.plantPic,
                    PlantDescription = item.plantDescription,
                    PlantViews = item.plantViews,
                    CreatedByAccountID = item.plantCreatedByAccountId,
                    PlantType = item.plantType,
                };
                plants.Add(temp);
            }
            db.Close();

            return plants;
        }

        public void Update(Plant plants)
        {
           string sql = "UPDATE plants SET ";

            var values = GetValues(plants);

            foreach (var temp in values) {
                if (temp.Key != "@plantid" && temp.Value != null && temp.Value.ToString() != "0") {
                    switch (temp.Key) {
                        case "@plantname":
                            sql += "plantName = \"" + plants.PlantName + "\" ,";
                            break;
                        case "@plantspeciesname":
                            sql += "plantSpeciesName = \"" + plants.PlantSpeciesName + "\" ,";
                            break;
                        case "@plantdifficultylevel":
                            sql += "plantDifficultyLevel = \"" + plants.PlantDifficultyLevel + "\" ,";
                            break;
                        case "@plantpic":
                            sql += "plantPic = \"" + plants.PlantPic + "\" ,";
                            break;
                        case "@plantdescription":
                            sql += "plantDescription = \"" + plants.PlantDescription + "\" ,";
                            break;
                        case "@plantviews":
                            sql += "plantViews = \"" + plants.PlantViews + "\" ,";
                            break;
                        case "@createdbyaccountid":
                            sql += "plantCreatedByAccountId = \"" + plants.CreatedByAccountID + "\" ,";
                            break;
                        case "@planttype":
                            sql += "plantType = \"" + plants.PlantType + "\" ,";
                            break;
                    }
                }
            }

            sql = sql.Remove(sql.Length - 1, 1);
            sql += " WHERE plantId = " + plants.PlantId + ";";
            // System.Console.WriteLine(sql);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(Plant plants)
        {
            var values = new Dictionary<string,object>(){
                {"@plantid", plants.PlantId},
                {"@plantname", plants.PlantName},
                {"@plantspeciesname", plants.PlantSpeciesName},
                {"@plantdifficultylevel",plants.PlantDifficultyLevel},
                {"@plantpic", plants.PlantPic},
                {"@plantdescription", plants.PlantDescription},
                {"@plantviews",plants.PlantViews},
                {"@createdbyaccountid", plants.CreatedByAccountID},
                {"@planttype", plants.PlantType}

            }; 
            return values;
        }
    }
}