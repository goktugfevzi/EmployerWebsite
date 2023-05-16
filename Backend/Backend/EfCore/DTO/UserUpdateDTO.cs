namespace Backend.EfCore.DTO
{
    public class UserUpdateDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public int departmentId { get; set; }
    }
}
