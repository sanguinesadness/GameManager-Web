using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace GameManager.Models
{
    public class GameManagerContext : IdentityDbContext<User>
    {
        public DbSet<Character> Characters { get; set; }

        public DbSet<Gender> Genders { get; set; }

        public DbSet<Hero> Heroes { get; set; }

        public DbSet<HeroClass> HeroClasses { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<ItemCategory> ItemCategories { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<CharacterBan> CharacterBans { get; set; }

        public DbSet<Inventory> Inventories { get; set; }

        public DbSet<Mob> Mobs { get; set; }


        public GameManagerContext(DbContextOptions<GameManagerContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}