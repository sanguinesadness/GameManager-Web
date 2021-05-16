using System;
using System.Linq;
using GameManager.Models;
using Microsoft.EntityFrameworkCore;

namespace GameManager
{
    public class SampleData
    {
        public static void Initialize(GameManagerContext context)
        {
            if (!context.Genders.Any())
            {
                context.AddRange(
                    new Gender() { Name = "Male" },
                    new Gender() { Name = "Female" },
                    new Gender() { Name = "Other" });

                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User()
                    {
                        UserName = "RobinBanks",
                        BirthDate = DateTime.Now,
                        Email = "robin@gmail.com",
                        LastConnection = DateTime.Now,
                        GenderId = 1
                    },
                    new User()
                    {
                        UserName = "Zhavia12",
                        BirthDate = DateTime.Now,
                        Email = "zhavia@gmail.com",
                        LastConnection = DateTime.Now,
                        GenderId = 2
                    },
                    new User()
                    {
                        UserName = "Heartbreaker228",
                        BirthDate = DateTime.Now,
                        Email = "hbre28@gmail.com",
                        LastConnection = DateTime.Now,
                        GenderId = 3
                    }
                    );
                
                context.SaveChanges();
            }
        }
    }
}