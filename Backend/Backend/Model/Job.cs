using System.ComponentModel.DataAnnotations;
using Backend.EfCore;

namespace Backend.Model
{
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

    }
}
