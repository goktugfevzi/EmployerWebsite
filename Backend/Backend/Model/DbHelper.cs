using Backend.EfCore;
namespace Backend.Model
{
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
 
        public Job GetJobById(int id)
        {
            Job response = new Job();
            var Job = _context.Jobs.Where(d => d.JobID.Equals(id)).FirstOrDefault();
            return new Job
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
        public void SaveJob(Job jobModel)
        {
            Job dbTable = new Job();


            dbTable.Title = jobModel.Title;
            dbTable.Location = jobModel.Location;
            dbTable.Salary = jobModel.Salary;
            dbTable.Company = jobModel.Company;
            dbTable.Description = jobModel.Description;
            dbTable.Experience = jobModel.Experience;
            //dbTable.User = _context.Users.Where(f => f.Id.Equals(jobModel.UserID)).FirstOrDefault();
            _context.Jobs.Add(dbTable);

            _context.SaveChanges();
        }
        public void UpdateJob(int JobID, Job jobModel)
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
    
        public void DeleteJob(int JobID)
        {
            var job = _context.Jobs.Where(d => d.JobID.Equals(JobID)).FirstOrDefault();
            if (job != null)
            {
                _context.Jobs.Remove(job);
                _context.SaveChanges();
            }
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