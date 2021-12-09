using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using API.Models.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumCommentsController : ControllerBase
    {
        // GET: api/ForumComments
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<ForumComments> Get()
        {
            IForumCommentsDataHandler forumCommentsDataHandler = new ForumCommentsDataHandler();
            return forumCommentsDataHandler.Select();
        }

        // GET: api/ForumComments/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetC")]
        public string GetC(int id)
        {
            return "value";
        }

        // POST: api/ForumComments
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] ForumComments value)
        {
            System.Console.WriteLine(value.FcommentId);
            System.Console.WriteLine(value.FcommentText);
            value.FcommentTimeStamp = DateTime.Now.ToString();
            System.Console.WriteLine(value.FcommentTimeStamp);
            System.Console.WriteLine(value.FcommentAccountId);
            System.Console.WriteLine(value.FcommentLikes);
            System.Console.WriteLine(value.FcommentOriginalPostId);
            IForumCommentsDataHandler fcomDataHandler = new ForumCommentsDataHandler();
            fcomDataHandler.Insert(value);
        }

        // PUT: api/ForumComments/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ForumComments value)
        {
            value.forumComments.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(ForumComments value)
        {
            value.forumComments.Delete(value);
        }
    }
}
