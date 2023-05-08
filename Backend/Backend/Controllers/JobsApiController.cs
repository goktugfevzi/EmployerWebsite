using Backend.EfCore;
using Backend.EfCore.DTO;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    public class JobsApiController : ControllerBase
    {

        private readonly DbHelper _db;
        public JobsApiController(EF_DataContext eF_DataContext)
        {
            _db = new DbHelper(eF_DataContext);
        }

        //GET: api/<JobsApiController>
        [HttpGet]
        [Route("api/[controller]/GetJob")]
        public IActionResult Get()
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<Job> data = _db.GetJobs();
                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
        [HttpGet]
        [Route("api/[controller]/GetUserJobs")]
        public IActionResult GetUserJobs()
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<UserJob> data = _db.GetUserJobs();
                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        [HttpGet]
        [Route("api/[controller]/GetUserjob/{userId}")]
        public IActionResult Get(string userId)
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<UserJobResponse> data = _db.GetUserJobs(userId);
                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // GET api/<JobsApiController>/5

        [HttpGet]
        [Route("api/[controller]/GetJobById/{id}")]
        public IActionResult Get(int id)
        {
            ResponseType type = ResponseType.Success;
            try
            {
                Job data = _db.GetJobById(id);

                if (data == null)
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
        // POST api/<JobsApiController>
        [HttpPost]
        [Route("api/[controller]/saveJob")]
        public IActionResult Post([FromBody] JobDTO model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveJob(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // PUT api/<JobsApiController>/5
        [HttpPut]
        [Route("api/[controller]/UpdateJob/{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] JobDTO jobmodel)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.UpdateJob(id, jobmodel);
                return Ok(ResponseHandler.GetAppResponse(type, jobmodel));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // PUT api/<JobsApiController>/5
        [HttpPut]
        [Route("api/[controller]/UpdateJobStatus/{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] statusDTO status)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.UpdateJobStatus(id, status);
                return Ok(ResponseHandler.GetAppResponse(type, status));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        //DELETE api/<JobsApiController>/5
        [HttpDelete]
        [Route("api/[controller]/DeleteJob/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.DeleteJob(id);
                return Ok(ResponseHandler.GetAppResponse(type, "Delete Job Successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
    }
}
