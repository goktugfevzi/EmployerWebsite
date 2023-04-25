using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    public class UseJobsModel
    {
        [Key, Required]
        public int UserJobID { get; set; }


        [ForeignKey("Job")]
        public int JobID { get; set; }

        public bool status { get; set; }
    }
}
