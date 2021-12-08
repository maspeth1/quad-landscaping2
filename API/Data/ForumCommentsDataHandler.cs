using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class ForumCommentsDataHandler : IForumCommentsDataHandler
    {
        private Database db;
        public ForumCommentsDataHandler()
        {
            db = new Database();
        }
        public void Delete(ForumComments forumComments)
        {
            string sql = "UPDATE forumcomments SET deleted = 'Y' WHERE fcommentid = @fcommentid";

            var values = GetValues(forumComments);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(ForumComments forumComments)
        {
            string sql = "INSERT INTO forumcomments (fcommentText, fcommentTimeStamp, fcommentAccountId, fcommentLikes, fcommentOriginalPostId)";
            sql += "VALUES (@fcommentText, @fcommentTimeStamp, @fcommentAccountId, @fcommentLikes, @fcommentOriginalPostId)";

            var values = GetValues(forumComments);
            db.Open();
            db.Insert(sql, values);
            db.Close();
        }

        public List<ForumComments> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM forumcomments WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<ForumComments> forumComments = new List<ForumComments>();
            foreach(dynamic item in results)
            {
                ForumComments temp = new ForumComments(){
                    FcommentId = item.fcommentId,
                    FcommentText = item.fcommentText,
                    FcommentTimeStamp = item.fcommentTimeStamp,
                    FcommentAccountId= item.fcommentAccountId,
                    FcommentLikes = item.fcommentLikes,
                    FcommentOriginalPostId = item.fcommentOriginalPostId,
                    
                };
                forumComments.Add(temp);
            }
            db.Close();

            return forumComments;
        }

        public void Update(ForumComments forumComments)
        {
           string sql = "UPDATE forumcomments SET ";

            var values = GetValues(forumComments);

            foreach (var temp in values) {
                if (temp.Key != "@fcommentId" && temp.Value != null  && temp.Value.ToString() != "0") {
                    switch (temp.Key) {
                        case "@fcommentText":
                            sql += "fcommentText = \"" + forumComments.FcommentText + "\" ,";
                            break;
                        case "@fcommentTimeStamp":
                            sql += "fcommentTimeStamp = \"" + forumComments.FcommentTimeStamp + "\" ,";
                            break;
                        case "@fcommentAccountId":
                            sql += "fcommentAccountIds = \"" + forumComments.FcommentAccountId + "\" ,";
                            break;
                        case "@fcommentLikes":
                            sql += "fcommentLikes = \"" + forumComments.FcommentLikes + "\" ,";
                            break;
                        case "@fcommentOriginalPostId":
                            sql += "fcommentOriginalPostId = \"" + forumComments.FcommentOriginalPostId + "\" ,";
                            break;
                    }
                }
            }

            sql = sql.Remove(sql.Length - 1, 1);
            sql += " WHERE fcommentId = " + forumComments.FcommentId + ";";
            // System.Console.WriteLine(sql);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(ForumComments forumComments)
        {
            var values = new Dictionary<string,object>(){
                {"@fcommentId", forumComments.FcommentId},
                {"@fcommentText", forumComments.FcommentText},
                {"@fcommentTimeStamp", forumComments.FcommentTimeStamp},
                {"@fcommentAccountId",forumComments.FcommentAccountId},
                {"@fcommentLikes",  forumComments.FcommentLikes},
                {"@fcommentOriginalPostId", forumComments.FcommentOriginalPostId}
            }; 
            return values;
        }
    }
}