using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{
    //[Table("Job")]

    public class Job
    {
        [Key]
        public int JobId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Deadline { get; set; }
        public Department department { get; set; }
        public int departmentId { get; set; }
        //public string userId { get; set; }= string.Empty;

    }
}
