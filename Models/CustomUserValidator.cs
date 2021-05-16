using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GameManager.Models
{
    public class CustomUserValidator : IUserValidator<User>
    {
        public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            List<IdentityError> errors = new List<IdentityError>();

            if (user.UserName.ToLower().Contains("admin"))
            {
                errors.Add(new IdentityError
                {
                    Description = "Имя пользователя не может содержать слово 'admin'"
                });
            }

            return Task.FromResult(errors.Count == 0 ?
                   IdentityResult.Success : IdentityResult.Failed(errors.ToArray()));
        }
    }
}
