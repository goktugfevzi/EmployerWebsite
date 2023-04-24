using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{
    [Table("UserJobs")]
    public class UserJobs
    {

        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserID { get; set; }
        [ForeignKey("Job")]
        public int JobID { get; set; }
        public bool status { get; set; }
    }
}
