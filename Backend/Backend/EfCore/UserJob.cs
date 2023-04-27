using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{
    public class UserJob
    {

        [Key]
        public int Id { get; set; }
        //[ForeignKey("UserID")]
        //public IdentityUser User { get; set; }
        //[ForeignKey("JobID")]
        //public Job job { get; set; }
        public bool status { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }
        public Job Job { get; set; }
        public int JobId { get; set; }
    }
}
