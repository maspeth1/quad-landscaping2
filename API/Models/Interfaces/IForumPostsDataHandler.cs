using System.Collections.Generic;

namespace API.Models.Interfaces
{
    public interface IForumPostsDataHandler
    {
         public List<ForumPost> Select();
         public void Delete(ForumPost forumPost);
         public void Update(ForumPost forumPost);
         public void Insert(ForumPost forumPost);
    }
}