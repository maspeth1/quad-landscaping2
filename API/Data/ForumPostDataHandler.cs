using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class ForumPostDataHandler : IForumPostsDataHandler
    {
        private Database db;
        public ForumPostDataHandler()
        {
            db = new Database();
        }
        public void Delete(ForumPost forumPost)
        {
            string sql = "UPDATE forumposts SET deleted = 'Y' WHERE postid = @postid";

            var values = GetValues(forumPost);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(ForumPost forumPost)
        {
            System.Console.WriteLine("Made it here");
            string sql = "INSERT INTO forumposts (postTimeStamp, postText, postLikes, postSubject, postAccountId, postViews)";
            sql += "VALUES (@postTimeStamp, @postText, @postLikes, @postSubject, @postAccountId, @postViews)";

            var values = GetValues(forumPost);
            db.Open();
            db.Insert(sql, values);
            db.Close();
        }

        public List<ForumPost> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM forumposts WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<ForumPost> forumPosts = new List<ForumPost>();
            foreach(dynamic item in results)
            {
                ForumPost temp = new ForumPost(){
                    PostId = item.postId,
                    PostTimeStamp = item.postTimeStamp,
                    PostText = item.postText,
                    PostLikes= item.postLikes,
                    PostSubject = item.postSubject,
                    PostAccountId = item.postAccountId,
                    PostViews = item.postViews,

                };
                forumPosts.Add(temp);
            }
            db.Close();

            return forumPosts;
        }

        public void Update(ForumPost forumPosts)
        {
           string sql = "UPDATE forumposts SET ";

            var values = GetValues(forumPosts);

            foreach (var temp in values) {
                if (temp.Key != "@postId" && temp.Value != null && temp.Value.ToString() != "0") {
                    switch (temp.Key) {
                        case "@postTimeStamp":
                            sql += "postTimeStamp = \"" + forumPosts.PostTimeStamp + "\" ,";
                            break;
                        case "@postText":
                            sql += "postText = \"" + forumPosts.PostText + "\" ,";
                            break;
                        case "@postLikes":
                            sql += "postLikes = \"" + forumPosts.PostLikes + "\" ,";
                            break;
                        case "@postSubject":
                            sql += "postSubject = \"" + forumPosts.PostSubject + "\" ,";
                            break;
                        case "@postAccountId":
                            sql += "postAccountId = \"" + forumPosts.PostAccountId + "\" ,";
                            break;
                        case "@postViews":
                            sql += "postViews = \"" + forumPosts.PostViews + "\" ,";
                            break;
                    }
                }
            }

            sql = sql.Remove(sql.Length - 1, 1);
            sql += " WHERE postId = " + forumPosts.PostId + ";";
            // System.Console.WriteLine(sql);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(ForumPost forumPosts)
        {
            var values = new Dictionary<string,object>(){
                {"@postId", forumPosts.PostId},
                {"@postTimeStamp", forumPosts.PostTimeStamp},
                {"@postText", forumPosts.PostText},
                {"@postLikes",forumPosts.PostLikes},
                {"@postSubject", forumPosts.PostSubject},
                {"@postAccountId", forumPosts.PostAccountId},
                {"@postViews", forumPosts.PostViews}
            }; 
            return values;
        }
    }
}