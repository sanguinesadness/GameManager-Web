using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameManager.Models
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual User User { get; set; }
        public string UserId { get; set; }
        public virtual Hero Hero { get; set; }
        public int HeroId { get; set; }
        public virtual int CurrentLocationId { get; set; }
        public Location CurrentLocation { get; set; }
        public DateTime CreationDate { get; set; }
        public int Lvl { get; set; }
        public int Rating { get; set; }
        public int Gold { get; set; }
        public int PlayedHours { get; set; }
    }
}