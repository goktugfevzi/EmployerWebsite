using Microsoft.EntityFrameworkCore;

namespace Backend.EfCore
{
    public class EF_DataContext : DbContext
    {
        public EF_DataContext(DbContextOptions<EF_DataContext> options) : base(options) { }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserJobs> UsersJobs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserJobs>()
                .HasKey(uj => new { uj.UserID, uj.JobID });
        }
    }
}
