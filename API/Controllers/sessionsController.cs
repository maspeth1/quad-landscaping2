using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using API.Models.Interfaces;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class sessionsController : ControllerBase
    {
        // GET: api/sessions
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Session> Get()
        {
            ISessions sessions = new SessionDataHandler();
            return sessions.Select();
        }

        // GET: api/sessions/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/sessions
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Session value)
        {
            System.Console.WriteLine(value.SessionId);
            value.SessionStartTime = DateTime.Now.ToString();
            System.Console.WriteLine(value.SessionStartTime);
            System.Console.WriteLine(value.SessionAccountId); 
        }

        // PUT: api/sessions/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Session value)
        {
            value.sessions.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(Session value)
        {
            value.sessions.Delete(value);
        }
    }
}
