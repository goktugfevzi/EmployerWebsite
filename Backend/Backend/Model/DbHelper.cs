using Backend.EfCore;
using Microsoft.EntityFrameworkCore;
namespace Backend.Model
{
    public class DbHelper
    {
        private EF_DataContext _context;
        public DbHelper(EF_DataContext context)
        {
            _context = context;
        }
        public List<UserModel> GetUsers()
        {
            List<UserModel> response = new List<UserModel>();
            var dataList = _context.Users.ToList();
            dataList.ForEach(User => response.Add(new UserModel()
            {
                UserID = User.UserID,
                Name = User.Name,
                Email = User.Email,
                Password = User.Password,
                Title = User.Title,
                HasJob = User.HasJob,
                isAdmin = User.isAdmin,
                JobFinished = User.JobFinished,

            }));
            return response;
        }
        public List<JobModel> GetJobs()
        {
            List<JobModel> response = new List<JobModel>();
            var dataList = _context.Jobs.ToList();
            dataList.ForEach(Job => response.Add(new JobModel()
            {
                JobID = Job.JobID,
                Title = Job.Title,
                Company = Job.Company,
                Description = Job.Description,
                Location = Job.Location,
                Salary = Job.Salary,
                Experience = Job.Experience,
            }));
            return response;
        }
        public UserModel GetUserById(int id)
        {
            UserModel response = new UserModel();
            var User = _context.Users.Where(d => d.UserID.Equals(id)).FirstOrDefault();
            return new UserModel
            {
                UserID = User.UserID,
                Name = User.Name,
                Email = User.Email,
                Password = User.Password,
                Title = User.Title,
                HasJob = User.HasJob,
                isAdmin = User.isAdmin,
                JobFinished = User.JobFinished,

            };
        }
        public JobModel GetJobById(int id)
        {
            JobModel response = new JobModel();
            var Job = _context.Jobs.Where(d => d.JobID.Equals(id)).FirstOrDefault();
            return new JobModel
            {
                JobID = Job.JobID,
                Title = Job.Title,
                Company = Job.Company,
                Description = Job.Description,
                Location = Job.Location,
                Salary = Job.Salary,
                Experience = Job.Experience,

            };
        }
        public void SaveJob(JobModel jobModel)
        {
            Job dbTable = new Job();


            dbTable.Title = jobModel.Title;
            dbTable.Location = jobModel.Location;
            dbTable.Salary = jobModel.Salary;
            dbTable.Company = jobModel.Company;
            dbTable.Description = jobModel.Description;
            dbTable.Experience = jobModel.Experience;
            //dbTable.User = _context.Users.Where(f => f.UserID.Equals(jobModel.UserID)).FirstOrDefault();
            _context.Jobs.Add(dbTable);

            _context.SaveChanges();
        }
        public void UpdateJob(int JobID, JobModel jobModel)
        {
            var updatedJob = _context.Jobs.Where(d => d.JobID.Equals(JobID)).FirstOrDefault();
            if (updatedJob != null)
            {

                updatedJob.Title = jobModel.Title;
                updatedJob.Location = jobModel.Location;
                updatedJob.Salary = jobModel.Salary;
                updatedJob.Company = jobModel.Company;
                updatedJob.Description = jobModel.Description;
                updatedJob.Experience = jobModel.Experience;
                _context.SaveChanges();

            }
        }
        public void SaveUser(UserModel userModel)
        {
            User dbTable = new User();

            dbTable.UserID = userModel.UserID;
            dbTable.Name = userModel.Name;
            dbTable.Email = userModel.Email;
            dbTable.Password = userModel.Password;
            dbTable.Title = userModel.Title;
            dbTable.HasJob = userModel.HasJob;
            dbTable.isAdmin = userModel.isAdmin;
            dbTable.JobFinished = userModel.JobFinished;
            _context.Users.Add(dbTable);
            _context.SaveChanges();
        }
        public void UpdateUser(UserModel userModel)
        {

            User dbTable = new User();
            dbTable = _context.Users.Where(d => d.UserID.Equals(userModel.UserID)).FirstOrDefault();
            if (dbTable != null)
            {
                dbTable.UserID = userModel.UserID;
                dbTable.Name = userModel.Name;
                dbTable.Email = userModel.Email;
                dbTable.Password = userModel.Password;
                dbTable.Title = userModel.Title;
                dbTable.HasJob = userModel.HasJob;
                dbTable.isAdmin = userModel.isAdmin;
                dbTable.JobFinished = userModel.JobFinished;
                _context.SaveChanges();
            }
        }
        public void DeleteJob(int JobID)
        {
            var job = _context.Jobs.Where(d => d.JobID.Equals(JobID)).FirstOrDefault();
            if (job != null)
            {
                _context.Jobs.Remove(job);
                _context.SaveChanges();
            }
        }
        public void DeleteUser(int UserID)
        {
            var user = _context.Users.Where(d => d.UserID.Equals(UserID)).FirstOrDefault();
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

    }
}