using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace GameManager.Models
{
    public class User : IdentityUser
    {
        public DateTime BirthDate { get; set; }

        public DateTime LastConnection { get; set; }

        public Gender Gender { get; set; }

        public int GenderId { get; set; }
    }
}