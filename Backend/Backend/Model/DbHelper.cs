using Backend.EfCore;
using Backend.Model.Authentication;

namespace Backend.Model
{
    //_context.UsersJobs.Add(new() { JobId = id, UserId = "" });
    //_context.UsersJobs.Where(uj => uj.UserId == "fvz");
    //_context.UsersJobs.FirstOrDefault(uj => uj.JobId == 1).UserId="22";
    public class DbHelper
    {
        private EF_DataContext _context;
        public DbHelper(EF_DataContext context)
        {
            _context = context;
        }

        public List<Job> GetJobs()
        {
            List<Job> response = new List<Job>();
            var dataList = _context.Jobs.ToList();
            dataList.ForEach(Job => response.Add(new Job()
            {
                JobId = Job.JobId,
                Title = Job.Title,
                Company = Job.Company,
                Description = Job.Description,
                Location = Job.Location,
                Salary = Job.Salary,
                Experience = Job.Experience,
            }));
            return response;
        }
 
        public Job GetJobById(int id)
        {
            Job response = new Job();
            var Job = _context.Jobs.Where(d => d.JobId.Equals(id)).FirstOrDefault();
            return new Job
            {
                JobId = Job.JobId,
                Title = Job.Title,
                Company = Job.Company,
                Description = Job.Description,
                Location = Job.Location,
                Salary = Job.Salary,
                Experience = Job.Experience,

            };
        }
        public void SaveJob(Job jobModel)
        {
            Job dbTable = new Job();

            dbTable.Title = jobModel.Title;
            dbTable.Location = jobModel.Location;
            dbTable.Salary = jobModel.Salary;
            dbTable.Company = jobModel.Company;
            dbTable.Description = jobModel.Description;
            dbTable.Experience = jobModel.Experience;
            dbTable.department = _context.Departments.FirstOrDefault(d => d.Equals(jobModel.department));
            //dbTable.User = _context.Users.Where(f => f.Id.Equals(jobModel.UserID)).FirstOrDefault();
            _context.Jobs.Add(dbTable);

            _context.SaveChanges();
        }

        public void UpdateJob(int JobID, Job jobModel)
        {
            var updatedJob = _context.Jobs.Where(d => d.JobId.Equals(JobID)).FirstOrDefault();
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
    
        public void DeleteJob(int JobID)
        {
            var job = _context.Jobs.Where(d => d.JobId.Equals(JobID)).FirstOrDefault();
            if (job != null)
            {
                _context.Jobs.Remove(job);
                _context.SaveChanges();
            }
        }

        internal Department GetDepartmentById(int deptId)
        {
            return _context.Departments.First(d => d.Id.Equals(deptId));
        }
        //public void DeleteUser(int UserID)
        //{
        //    var user = _context.Users.Where(d => d.UserID.Equals(UserID)).FirstOrDefault();
        //    if (user != null)
        //    {
        //        _context.Users.Remove(user);
        //        _context.SaveChanges();
        //    }
        //}

    }
}