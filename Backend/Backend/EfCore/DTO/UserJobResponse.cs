namespace Backend.EfCore
{
    public class UserJobResponse
    {
        public int UserJobId { get; set; }
        public string UserId { get; set; }
        public int JobId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Deadline { get; set; }
        public Department department { get; set; }

    }
}
