﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{

    public class User : IdentityUser
    {
        [ForeignKey("departmentId")]
        public Department department { get; set; }
        public int departmentId { get; set; }



    }
}
