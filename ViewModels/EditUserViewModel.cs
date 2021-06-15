using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameManager.ViewModels
{
    public class EditUserViewModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public DateTime Birthdate { get; set; }

        public int GenderId { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
