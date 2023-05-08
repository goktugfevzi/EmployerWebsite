namespace Backend.EfCore.DTO
{
    public class UserUpdateModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public int departmentId { get; set; }
    }
}
