namespace GameManager.Models
{
    public class Hero
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int HeroClassId { get; set; }
        public HeroClass HeroClass { get; set; }
        
        public string Icon { get; set; }

        public string Avatar { get; set; }
        
        public string Description { get; set; }
    }
}