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
    public class ForumPostsController : ControllerBase
    {
        // GET: api/ForumPosts
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<ForumPost> Get()
        {
            IForumPostsDataHandler forumPosts = new ForumPostDataHandler();
            return forumPosts.Select();
        }

        // GET: api/ForumPosts/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetF")]
        public string GetF(int id)
        {
            return "value";
        }

        // POST: api/ForumPosts
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] ForumPost value)
        {
            System.Console.WriteLine(value.PostId);
            value.PostTimeStamp = DateTime.Now.ToString();
            System.Console.WriteLine(value.PostTimeStamp);
            System.Console.WriteLine(value.PostText);
            System.Console.WriteLine(value.PostLikes);
            System.Console.WriteLine(value.PostSubject);
            System.Console.WriteLine(value.PostAccountId);
            System.Console.WriteLine(value.PostViews);

        }

        // PUT: api/ForumPosts/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ForumPost value)
        {
            value.postsDataHandler.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(ForumPost value)
        {
            value.postsDataHandler.Delete(value);
        }
    }
}
