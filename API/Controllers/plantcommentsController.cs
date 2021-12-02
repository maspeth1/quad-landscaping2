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
    public class plantcommentsController : ControllerBase
    {
        // GET: api/plantcomments
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<PlantComments> Get()
        {
            IPlantCommentsDataHandler commentsDataHandler = new PCommentsDataHandler();
            return commentsDataHandler.Select();
        }

        // GET: api/plantcomments/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetT")]
        public string GetT(int id)
        {
            return "value";
        }

        // POST: api/plantcomments
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] PlantComments value)
        {
            System.Console.WriteLine(value.PCommentId);
            System.Console.WriteLine(value.PCommentText);
            value.PCommentTimeStamp = DateTime.Now.ToString();
            System.Console.WriteLine(value.PCommentTimeStamp);
            System.Console.WriteLine(value.PCommentAccountId);
            System.Console.WriteLine(value.PCommentLikes);
            System.Console.WriteLine(value.PCommentPlantId);

        }

        // PUT: api/plantcomments/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] PlantComments value)
        {
            value.CommentsDataHandler.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(PlantComments value)
        {
            value.CommentsDataHandler.Delete(value);
        }
    }
}
