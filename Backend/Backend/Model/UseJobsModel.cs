using Backend.EfCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class UseJobsModel
    {
        [Key, Required]
        public int UserJobID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [ForeignKey("Job")]
        public int JobID { get; set; }

        public virtual User User { get; set; }
        public bool status { get; set; }

        public virtual Job Job { get; set; }
    }
}
