using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection.Emit;

namespace Backend.EfCore
{
    public class EF_DataContext : IdentityDbContext<User>
    {
        public EF_DataContext(DbContextOptions<EF_DataContext> options) : base(options) { }
        public DbSet<Job> Jobs { get; set; }

        public DbSet<Department> Departments { get; set; }
        public DbSet<UserJob> UsersJobs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
           base.OnModelCreating(builder);
            SeedDepartment(builder);
            SeedRoles(builder);
        }
        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
                (
                new IdentityRole() { Name = "ADMIN", ConcurrencyStamp = "1", NormalizedName = "ADMIN" },
                new IdentityRole() { Name = "USER", ConcurrencyStamp = "2", NormalizedName = "USER" }
                );
        }
        private static void SeedDepartment(ModelBuilder builder)
        {
            builder.Entity<Department>().HasData
                (
                new Department() { Id = 1, Name = "YAZILIM" },
                new Department() { Id = 2, Name = "MUHASEBE" },
                new Department() { Id = 3, Name = "IK" }

                );
        }

    }
}
