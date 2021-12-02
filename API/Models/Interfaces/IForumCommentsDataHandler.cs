using System.Collections.Generic;

namespace API.Models.Interfaces
{
    public interface IForumCommentsDataHandler
    {
         public List<ForumComments> Select();
         public void Delete(ForumComments forumComments);
         public void Update(ForumComments forumComments);
         public void Insert(ForumComments forumComments);
    }
}