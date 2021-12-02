using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class ForumPost
    {
        public int PostId {get; set;}
        public string PostTimeStamp {get; set;}
        public string PostText {get; set;}
        public int PostLikes {get; set;}
        public string PostSubject {get; set;}
        public int PostAccountId {get; set;}
        public int PostViews {get; set;}
        public IForumPostsDataHandler postsDataHandler {get; set;}

        public ForumPost()
        {
            postsDataHandler = new ForumPostDataHandler();
        }

    }
}