using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend.Model;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Backend.EfCore;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Backend.EfCore.DTO;

namespace Backend.Controllers
{
    //[Authorize(Roles ="ADMIN")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly EF_DataContext _context;
        private readonly DbHelper _db;
        private IPasswordHasher<User> passwordHasher;
        public AdminController(UserManager<User> usrMgr, IPasswordHasher<User> passwordHash, EF_DataContext context)
        {
            _userManager = usrMgr;
            passwordHasher = passwordHash;
            _context = context;
            _db = new DbHelper(context);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse { Code = "Success", Message = $"User deleted {user.UserName} SuccessFully" });
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return Ok();
        }

        [HttpPost]
        [Route("saveuserjob")]
        public async Task<IActionResult> SaveUserJob([FromBody] UserJobDto job)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                bool hasJob = _context.UsersJobs.Any(uj => uj.UserId == job.UserId && uj.JobId == job.JobId);
                var dUser = await _userManager.FindByIdAsync(job.UserId);
                //var x = _context.Jobs.Where(j=>j.JobId==job.JobId).ToList().FirstOrDefault();
                Job dJob = _db.GetJobById(job.JobId);
                if (dJob.departmentId != dUser.departmentId)
                {
                    type = ResponseType.ValidationError;
                    return Ok(ResponseHandler.GetAppResponse(type, "This job is different with your department"));
                }
                if (hasJob)
                {
                    type = ResponseType.ValidationError;
                    return Ok(ResponseHandler.GetAppResponse(type, "User already has this job"));
                }
                UserJob user = new UserJob();
                user.UserId = job.UserId;
                user.JobId = job.JobId;
                Random random = new Random();
                user.Id = random.Next();
                _context.UsersJobs.Add(user);
                //x.userId=job.UserId;
                //_context.Jobs.Update(x);
                _context.SaveChanges();
                    ;
                return Ok(ResponseHandler.GetAppResponse(type, job));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        [HttpDelete]
        [Route("deleteuserjob/{id}")]
        public async Task<IActionResult> DeleteUserJob(int id)
        {
            var deletedjob = _context.UsersJobs.Where(d => d.Id.Equals(id)).FirstOrDefault();
            try
            {
                ResponseType type = ResponseType.Success;
                _context.UsersJobs.Remove(deletedjob);
                _context.SaveChanges();
                return Ok(ResponseHandler.GetAppResponse(type, deletedjob));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
    }
}

