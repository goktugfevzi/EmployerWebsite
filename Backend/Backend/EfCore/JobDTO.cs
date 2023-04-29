using System.Text.Json.Serialization;

namespace Backend.EfCore
{
    public class JobDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public int DepartmentId { get; set; } 
    }
}
