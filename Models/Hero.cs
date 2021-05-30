using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameManager.Models
{
    public class Hero
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }

        public virtual HeroClass HeroClass { get; set; }
        public int HeroClassId { get; set; }
        
        public string Icon { get; set; }

        public string Avatar { get; set; }
        
        public string Description { get; set; }

        public virtual List<Character> Characters { get; set; }
    }
}