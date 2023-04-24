using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{
    [Table("UserJobs")]
    public class UserJobs
    {
        [ForeignKey("User")]
        public int UserID { get; set; }
        [ForeignKey("Job")]
        public int JobID { get; set; }

        //public virtual User User { get; set; }
        public bool status { get; set; }

        //public virtual Job Job { get; set; }

    }
}
