using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class AccountDataHandler : IAccountDataHandler
    {
        private Database db;
        public AccountDataHandler()
        {
            db = new Database();
        }
        public void Delete(Account accounts)
        {
            string sql = "UPDATE accounts SET deleted = 'Y' WHERE accountid = @accountid";

            var values = GetValues(accounts);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(Account accounts)
        {
            string sql = "INSERT INTO accounts (AccountUsername, AccountFName, AccountLName, AccountPassword, AccountAdminStatus, AccountBio, AccountProfilePic, AccountCreatedSessionId) VALUES (@accountusername, @accountfname, @accountlname, @accountpassword, @accountadminstatus, @accountbio, @accountprofilepic, @accountcreatedsessionid)";

            var values = GetValues(accounts);
            db.Open();
            db.Insert(sql, values);
            db.Close();

        }

        public List<Account> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM accounts WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<Account> accounts = new List<Account>();
            foreach(dynamic item in results)
            {
                Account temp = new Account(){
                    AccountId = item.accountId,
                    AccountUsername = item.accountUsername,
                    AccountFName = item.accountFName,
                    AccountLName= item.accountLName,
                    AccountPassword = item.accountPassword,
                    AccountAdminStatus = item.accountAdminStatus,
                    AccountBio = item.accountBio,
                    AccountProfilePic = item.accountProfilePic,
                    AccountCreatedSessionId = item.accountCreatedSessionId,
                    
                };
                accounts.Add(temp);
            }
            db.Close();

            return accounts;
        }

        public void Update(Account accounts)
        {
           string sql = "UPDATE accounts SET AccountUsername = @accountusername, AccountFName = @accountfname, AccountLName = @accountlname, AccountPassword = @accountpassword, AccountAdminStatus = @accountadminStatus, AccountBio = @accountBio, AccountProfilePic = @accountProfilePic, AccountCreatedSessionId = @accountcreatedsessionid WHERE Accountid = @accountid";

            var values = GetValues(accounts);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(Account accounts)
        {
            var values = new Dictionary<string,object>(){
                {"@@accountId", accounts.AccountId},
                {"@accountUsername", accounts.AccountUsername},
                {"@accountFName", accounts.AccountFName},
                {"@accountLName",accounts.AccountLName},
                {"@accountPassword",  accounts.AccountPassword},
                {"@accountAdminStatus", accounts.AccountAdminStatus},
                {"@accountBio", accounts.AccountBio},
                {"@accountProfilePic", accounts.AccountProfilePic},
                {"@accountCreatedSessionId", accounts.AccountCreatedSessionId},
            }; 
            return values;
        }
    }
}