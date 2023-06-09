﻿using System.ComponentModel.DataAnnotations;

namespace Backend.EfCore.DTO.Authentication
{
    public class LoginUser
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
