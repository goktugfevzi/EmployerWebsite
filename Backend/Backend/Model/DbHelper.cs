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
                Description = Job.Description,
                Created = Job.Created,
                Deadline = Job.Deadline,
                department = Job.department,
            }));
            return response;
        }


        public Job GetJobById(int id)
        {
            var Job = _context.Jobs.Where(d => d.JobId.Equals(id)).FirstOrDefault();
            return new Job
            {
                JobId = Job.JobId,
                Title = Job.Title,
                Description = Job.Description,
                Created = Job.Created,
                Deadline = Job.Deadline,
                department = Job.department,

            };

        }
        public void SaveJob(JobDTO jobModel)
        {
            Job dbTable = new Job();

            dbTable.Title = jobModel.Title;
            DateTime utcDateTime = DateTime.Now.ToUniversalTime();
            dbTable.Created = utcDateTime;
            utcDateTime = jobModel.Deadline.ToUniversalTime();
            dbTable.Deadline = utcDateTime;
            dbTable.Description = jobModel.Description;
            dbTable.department = _context.Departments.Where(d => d.Id.Equals(jobModel.DepartmentId)).FirstOrDefault();
            _context.Jobs.Add(dbTable);
            _context.SaveChanges();
        }


        public void UpdateJob(int JobID, JobDTO jobModel)
        {
            var updatedJob = _context.Jobs.Where(d => d.JobId.Equals(JobID)).FirstOrDefault();
            if (updatedJob != null)
            {
                updatedJob.Title = jobModel.Title;
                updatedJob.Description = jobModel.Description;
               DateTime utcDateTime = jobModel.Deadline.ToUniversalTime();

                updatedJob.Deadline = utcDateTime;
                if (updatedJob.department != null)
                {
                    updatedJob.department.Id = jobModel.DepartmentId;
                }
                else
                {
                    updatedJob.department = new Department { Id = jobModel.DepartmentId };
                }
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
    }
}