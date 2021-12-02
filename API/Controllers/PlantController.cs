using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Models.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class plantController : ControllerBase
    {
        // GET: api/qlg
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Plant> Get()
        {
            IPlantDataHandler dataHandler = new PlantDataHandler();
            return dataHandler.Select();
        }

        // GET: api/qlg/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetB")]
        public string GetB(int id)
        {
            return "value";
        }

        // POST: api/qlg
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Plant value)
        {
            System.Console.WriteLine(value.PlantName);
            System.Console.WriteLine(value.PlantSpeciesName);
            System.Console.WriteLine(value.PlantDifficultyLevel);
            System.Console.WriteLine(value.PlantPic);
            System.Console.WriteLine(value.PlantDescription);
            System.Console.WriteLine(value.PlantViews);
            System.Console.WriteLine(value.CreatedByAccountID);
            System.Console.WriteLine(value.PlantType);
            value.dataHandler.Insert(value);
        }

        // PUT: api/qlg/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Plant value)
        {
            value.dataHandler.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(Plant value)
        {
            value.dataHandler.Delete(value);
        }
    }
}
