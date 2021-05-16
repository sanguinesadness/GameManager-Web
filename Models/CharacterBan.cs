using System;

namespace GameManager.Models
{
    public class CharacterBan
    {
        public int Id { get; set; }
        
        public int CharacterId { get; set; }
        public Character Character { get; set; }
        
        public DateTime Date { get; set; }
        
        public string Reason { get; set; }
    }
}