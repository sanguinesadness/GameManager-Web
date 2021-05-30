using System.ComponentModel.DataAnnotations;

namespace GameManager.Models
{
    public class Mob
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public string Description { get; set; }

        public int GoldEarn { get; set; } 
    }
}
