using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.EfCore
{

    public class User : IdentityUser
    {
        public Department department { get; set; }

    }
}
