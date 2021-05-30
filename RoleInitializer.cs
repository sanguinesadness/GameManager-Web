using GameManager.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace GameManager
{
    public class RoleInitializer
    {
        public static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            const string adminName = "GmsAdmin";
            const string adminEmail = "gmsadmin@gmail.com";
            const string adminPassword = "qwe123rty";
            DateTime adminBirthDate = new DateTime(2001, 04, 15);
            
            if (await roleManager.FindByNameAsync("Admin") is null)
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (await roleManager.FindByNameAsync("Player") is null)
            {
                await roleManager.CreateAsync(new IdentityRole("Player"));
            }

            if (await userManager.FindByNameAsync(adminName) is null)
            {
                User admin = new()
                {
                    UserName = adminName,
                    Email = adminEmail,
                    BirthDate = adminBirthDate,
                    LastConnection = DateTime.Now,
                    GenderId = 1
                };

                IdentityResult result = await userManager.CreateAsync(admin, adminPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
