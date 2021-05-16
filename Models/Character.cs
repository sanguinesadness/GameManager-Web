using System;

namespace GameManager.Models
{
    public class Character
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int HeroId { get; set; }
        public Hero Hero { get; set; }
        
        public int CurrentLocationId { get; set; }
        public Location CurrentLocation { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public int Lvl { get; set; }
        
        public int Rating { get; set; }
        
        public int Gold { get; set; }
        
        public int PlayedHours { get; set; }
    }
}