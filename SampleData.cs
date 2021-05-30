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
            }

            if (!context.HeroClasses.Any())
            {
                context.Add(new HeroClass() { Id = 1, Name = "Сила" });
            }

            if (!context.Heroes.Any())
            {
                context.Add(new Hero() { Id = 1, HeroClassId = 1, Name = "Lina" });
            }

            if (!context.Locations.Any())
            {
                context.Add(new Location() { Id = 1, Name = "Тельдрассил" });
            }

            context.SaveChanges();
        }
    }
}