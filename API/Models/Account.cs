using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class Account
    {
        public int AccountId {get; set;}
        public string AccountUsername {get; set;}
        public string AccountFName {get; set;}
        public string AccountLName {get; set;}
        public string AccountPassword {get; set;}
        public int AccountAdminStatus {get; set;}
        public string AccountBio {get; set;}
        public string AccountProfilePic {get; set;}
        public int AccountCreatedSessionId {get; set;}
        
        public IAccountDataHandler dataHandler{get; set;}

        public Account()
        {
            dataHandler = new AccountDataHandler();
        }
        

    }
}