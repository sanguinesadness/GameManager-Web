using System;

namespace GameManager.ViewModels
{
    public enum CharacterStatus
    {
        Banned,
        Active
    }

    public class MyCharacterInfoViewModel
    {
        public int Id { get; set; }
        public CharacterStatus Status { get; set; }

        public string CurrentLocation { get; set; }

        public int Level { get; set; }

        public string HeroClass { get; set; }

        public int PlayedHours { get; set; }

        public int Gold { get; set; }

        public int Rating { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
