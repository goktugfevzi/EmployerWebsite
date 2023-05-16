using Backend.Model;

namespace Backend.EfCore
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
                JobId = Job.JobId,
                Title = Job.Title,
                Status = Job.Status,
                Description = Job.Description,
                Created = Job.Created,
                Deadline = Job.Deadline,
                departmentId = Job.departmentId,
            }));
            return response;
        }
        public List<UserJob> GetUserJobs()
        {
            List<UserJob> response = new List<UserJob>();
            var dataList = _context.UsersJobs.ToList();
            dataList.ForEach(Job => response.Add(new UserJob()
            {
                JobId = Job.JobId,
                UserId = Job.UserId,
                Id = Job.Id,
            }));
            return response;
        }

        public List<UserJobResponse> GetUserJobs(string userId)
        {
            List<UserJobResponse> response = new List<UserJobResponse>();
            var userJobs = _context.UsersJobs.Where(uj => uj.UserId == userId).ToList();
            foreach (var userJob in userJobs)
            {
                var job = _context.Jobs.FirstOrDefault(j => j.JobId == userJob.JobId);
                if (job != null)
                {
                    response.Add(new UserJobResponse()
                    {
                        UserJobId = userJob.Id,
                        UserId = userJob.UserId,
                        JobId = job.JobId,
                        Title = job.Title,
                        Status = job.Status,
                        Description = job.Description,
                        Created = job.Created,
                        Deadline = job.Deadline,
                        department = job.department,
                    });
                }
            }
            return response;
        }

        public Job GetJobById(int id)
        {
            var Job = _context.Jobs.Where(d => d.JobId.Equals(id)).FirstOrDefault();
            return new Job
            {
                JobId = Job.JobId,
                Title = Job.Title,
                Status = Job.Status,
                Description = Job.Description,
                Created = Job.Created,
                Deadline = Job.Deadline,
                department = Job.department,
                departmentId = Job.departmentId,

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
            dbTable.Status = jobModel.Status;
            dbTable.Description = jobModel.Description;
            dbTable.departmentId = jobModel.DepartmentId;
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
                updatedJob.Status = jobModel.Status;
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
        public void UpdateJobStatus(int JobID, statusDTO statusDTO)
        {
            var updatedJob = _context.Jobs.Where(d => d.JobId.Equals(JobID)).FirstOrDefault();
            if (updatedJob != null)
            {
                updatedJob.Status = statusDTO.status;
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