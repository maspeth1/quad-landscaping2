using System;
using System.Dynamic;
using System.Collections.Generic;
using API.Models;
using API.Models.Interfaces;
using API.Data;

namespace API.Data
{
    public class PCommentsDataHandler : IPlantCommentsDataHandler
    {
        private Database db;
        public PCommentsDataHandler()
        {
            db = new Database();
        }
        public void Delete(PlantComments pComments)
        {
            string sql = "UPDATE plantcomments SET deleted = 'Y' WHERE PCommentId = @pcommentid";

            var values = GetValues(pComments);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }

        public void Insert(PlantComments pComments)
        {
            string sql = "INSERT INTO plantcomments (PCommentText, PCommentTimeStamp, PCommentAccountId, PCommentLikes, PCommmentPlantId)";
            sql += "VALUES (@PCommentText, @PCommentTimeStamp, @PCommentAccountId, @PCommentLikes, @PCommmentPlantId)";

            var values = GetValues(pComments);
            db.Open();
            db.Insert(sql, values);
            db.Close();

        }

        public List<PlantComments> Select()
        {
            
            db.Open();
            string sql = "SELECT * FROM plantcomments WHERE deleted = 'N'";
            List<ExpandoObject> results = db.Select(sql);

            List<PlantComments> pComments = new List<PlantComments>();
            foreach(dynamic item in results)
            {
                PlantComments temp = new PlantComments(){
                    PCommentId = item.pcommentId,
                    PCommentText = item.pcommentText,
                    PCommentTimeStamp = item.pcommentTimeStamp,
                    PCommentAccountId= item.pcommentAccountId,
                    PCommentLikes = item.pcommentLikes,
                    PCommentPlantId = item.pcommentPlantId,
                };
                pComments.Add(temp);
            }
            db.Close();

            return pComments;
        }

        public void Update(PlantComments pComments)
        {
           string sql = "UPDATE plantcomments SET  PCommentText = @PCommentText, PCommentTimeStamp = @PCommentTimeStamp, PCommentAccountId = @PCommentAccountId, PCommentLikes = @PCommentLikes, PCommmentPlantId = @PCommmentPlantId  WHERE PCommentId = @pcommentid)";

            var values = GetValues(pComments);
            db.Open();
            db.Update(sql, values);
            db.Close();
        }
        public Dictionary<string, object> GetValues(PlantComments pComments)
        {
            var values = new Dictionary<string,object>(){
                {"@pcommentid", pComments.PCommentId},
                {"@pcommentText", pComments.PCommentText},
                {"@PcommentTimeStamp", pComments.PCommentTimeStamp},
                {"@PcommentAccountId",pComments.PCommentAccountId},
                {"@PcommentLikes", pComments.PCommentLikes},
                {"@PcommentPlantId", pComments.PCommentPlantId}
            }; 
            return values;
        }
    }
}