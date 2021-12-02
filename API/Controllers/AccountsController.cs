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
    public class AccountsController : ControllerBase
    {
        // GET: api/Accounts
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Account> Get()
        {
            IAccountDataHandler accountDataHandler = new AccountDataHandler();
            return accountDataHandler.Select();
        }

        // GET: api/Accounts/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetA")]
        public string GetA(int id)
        {
            return "value";
        }

        // POST: api/Accounts
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Account value)
        {
            System.Console.WriteLine(value.AccountId);
            System.Console.WriteLine(value.AccountUsername);
            System.Console.WriteLine(value.AccountFName);
            System.Console.WriteLine(value.AccountLName);
            System.Console.WriteLine(value.AccountPassword);
            System.Console.WriteLine(value.AccountAdminStatus);
            System.Console.WriteLine(value.AccountBio);
            System.Console.WriteLine(value.AccountProfilePic);
            System.Console.WriteLine(value.AccountCreatedSessionId);
             IAccountDataHandler accountDataHandler = new AccountDataHandler();
             accountDataHandler.Insert(value);
        }

        // PUT: api/Accounts/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Account value)
        {
           value.dataHandler.Update(value);
        }

        // DELETE: api/ApiWithActions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(Account value)
        {
            value.dataHandler.Delete(value);
        }
    }
}
