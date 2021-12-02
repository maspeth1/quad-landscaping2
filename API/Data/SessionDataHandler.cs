using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class SessionDataHandler : ISessions
    {
        private Database db;
        public SessionDataHandler()
        {
            db = new Database();
        }
        public void Delete(Session session)
        {
            string sql = "UPDATE sessions SET deleted = 'Y' WHERE SessionId = @sessionId";

            var values = GetValues(session);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(Session session)
        {
            string sql = "INSERT INTO sessions (SessionStartTime, SessionAccountId)";
            sql += "VALUES (@sessionStartTime, @sessionAccountId)";

            var values = GetValues(session);
            db.Open();
            db.Insert(sql, values);
            db.Close();

        }

        public List<Session> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM sessions WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<Session> sessions = new List<Session>();
            foreach(dynamic item in results)
            {
                Session temp = new Session(){
                    SessionId = item.sessionId,
                    SessionStartTime = item.sessionStartTime,
                    SessionAccountId = item.sessionAccountId,  
                };
                sessions.Add(temp);
            }
            db.Close();

            return sessions;
        }

        public void Update(Session session)
        {
           string sql = "UPDATE sessions SET SessionStartTime = @sessionStartTime, SessionAccountId = @sessionAccountId WHERE SessionId = @sessionId";

            var values = GetValues(session);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(Session session)
        {
            var values = new Dictionary<string,object>(){
                {"@sessionId", session.SessionId},
                {"@sessionStartTime", session.SessionStartTime},
                {"@sessionAccountId", session.SessionAccountId},
            }; 
            return values;
        }
    }
}