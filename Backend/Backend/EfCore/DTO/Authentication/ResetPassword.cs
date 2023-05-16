using System.ComponentModel.DataAnnotations;

namespace Backend.EfCore.DTO.Authentication
{
    public class ResetPassword
    {
        [Required(ErrorMessage = "Confirm Password is required")]
        public string? confirmPassword { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "token is required")]
        public string? Token { get; set; }
    }
}
