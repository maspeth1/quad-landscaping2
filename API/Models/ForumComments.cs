using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class ForumComments
    {
        public int FcommentId {get; set;}
        public string FcommentText {get; set;}
        public string FcommentTimeStamp {get; set;}
        public int FcommentAccountId {get; set;}
        public int FcommentLikes {get; set;}
        public int FcommentOriginalPostId {get; set;}
        public IForumCommentsDataHandler forumComments {get; set;}

        public ForumComments()
        {
            forumComments = new ForumCommentsDataHandler();
        }

    }
}