using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class Session
    {
        public int SessionId {get; set;}
        public string SessionStartTime {get; set;}
        public int SessionAccountId {get; set;}
        public ISessions sessions{get; set;}
        public string Date { get; internal set; }

        public Session()
        {
            sessions = new SessionDataHandler();
        }
    }
}