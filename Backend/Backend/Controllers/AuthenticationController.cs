using Backend.EfCore;
using Backend.Model;
using Backend.Model.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web;
using UserManagementService.Models;
using UserManagementService.Services;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly EF_DataContext _db;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager, IEmailService emailService, IConfiguration configuration, EF_DataContext db)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _emailService = emailService;
            _configuration = configuration;
            _db = db;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new ApiResponse { Code = "Error", Message = "User already exists!" });
            }

            User user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username,
                department = _db.Departments.FirstOrDefault(d => d.Id.Equals(registerUser.department))
            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                //Add the User in the database
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new ApiResponse { Code = "Error", Message = "User Failed to Create" });
                }
                //Add role to the user....
                await _userManager.AddToRoleAsync(user, role);

                //Add Token to Verify the email....
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
                var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
                _emailService.SendEmail(message);

                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse { Code = "Success", Message = $"User created & Email Sent to {user.Email} SuccessFully" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new ApiResponse { Code = "Error", Message = "This Role Doesnot Exist." });
            }
        }


        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status200OK,
                      new ApiResponse { Code = "Success", Message = "Email Verified Successfully" });
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError,
                       new ApiResponse { Code = "Error", Message = "This User Doesnot exist!" });
        }

        // await _signInManager.SignOutAsync();
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                var jwtToken = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                });
                //returning the token...

            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("forgot-password/{email}")]
        public async Task<IActionResult> ForgotPassword([Required] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var forgotPasswordLink = Url.Action("ResetPassword", "Authentication", new { token, email = user.Email }, Request.Scheme);
                var message = new Message(new string[] { user.Email! }, "Forgot Password Link", forgotPasswordLink!);
                _emailService.SendEmail(message);
                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse { Code = "success", Message = $"Password Change Request is sent on Email {user.Email}. Please Open your meail & Click the link." });
            }
            return StatusCode(StatusCodes.Status400BadRequest,
                new ApiResponse { Code = "Error", Message = "Couldnot send link to email, please try again" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {

            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user != null)
            {
                var resetPasswordConfirm = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.confirmPassword);
                if (!resetPasswordConfirm.Succeeded)
                {
                    foreach (var error in resetPasswordConfirm.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return Ok(ModelState);
                }
                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse { Code = "Success", Message = "Password has been changed" });
            }
            return StatusCode(StatusCodes.Status400BadRequest,
                new ApiResponse { Code = "Error", Message = "Password couldnot changed." });
        }


        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        [Route("role/{userId}")]
        public async Task<IActionResult> GetUserRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }
        [HttpGet]
        [Route("getUsers/")]
        public async Task<IActionResult> getUser()
        {
            var users = await _userManager.GetUsersInRoleAsync("user");
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users.Select(u => new { u.Id, u.UserName, u.Email, u.departmentId, u.EmailConfirmed }));
        }
        [HttpPut]
        [Route("userupdate/{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserUpdateModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            // Kullanıcının username ve email'ini değiştirme işlemi
            user.UserName = model.UserName;
            user.Email = model.Email;
            user.departmentId = model.departmentId;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                 return Ok(result);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        [HttpGet]
        [Route("getuserByname/{name}")]
        public IActionResult Get(string name)
        {
            var user = _db.Users.Where(d => d.UserName.Equals(name)).FirstOrDefault();
            ResponseType type = ResponseType.Success;
            try
            {
                User data = new User()
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    departmentId = user.departmentId,
                    Id = user.Id,
                    EmailConfirmed = user.EmailConfirmed,
                    PasswordHash = user.PasswordHash
                };
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
        [HttpGet]
        [Route("getuserById/{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _db.Users.Where(d => d.Id.Equals(id)).FirstOrDefault();
            ResponseType type = ResponseType.Success;
            try
            {
                User data = new User()
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    departmentId = user.departmentId,
                    Id = user.Id,
                    EmailConfirmed = user.EmailConfirmed,
                    PasswordHash = user.PasswordHash
                };
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

        [HttpPost]
        [AllowAnonymous]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePassword changePassword)
        {

            var user = await _userManager.FindByEmailAsync(changePassword.Email);
            if (user != null)
            {
                var changePasswordConfirm = await _userManager.ChangePasswordAsync(user, changePassword.CurrentPassword, changePassword.NewPassword);
                if (!changePasswordConfirm.Succeeded)
                {
                    foreach (var error in changePasswordConfirm.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return Ok(ModelState);
                }
                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse { Code = "Success", Message = "Password has been changed" });
            }
            return StatusCode(StatusCodes.Status400BadRequest,
                new ApiResponse { Code = "Error", Message = "Password couldnot changed." });
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

    }
}
