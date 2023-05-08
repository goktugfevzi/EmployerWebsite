using UserManagementService.Models;

namespace UserManagementService.Services
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
