using API.Models.Interfaces;
using API.Data;
namespace API.Models
{
    public class PlantComments
    {
        public int PCommentId {get; set;}
        public string PCommentText {get; set;}
        public string PCommentTimeStamp {get; set;}
        public int PCommentAccountId {get; set;}
        public int PCommentLikes {get; set;}
        public int PCommentPlantId {get; set;}
        public IPlantCommentsDataHandler CommentsDataHandler {get; set;}

        public PlantComments()
        {
            CommentsDataHandler = new PCommentsDataHandler();
        }

    }
}