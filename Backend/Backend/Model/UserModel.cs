using Backend.EfCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class UserModel
    {
        [Key]
        public int UserID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool isAdmin { get; set; }
        public string HasJob { get; set; }
        public bool JobFinished { get; set; }
    }
}