using System.ComponentModel.DataAnnotations;

namespace Backend.EfCore
{

    public class Department
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
