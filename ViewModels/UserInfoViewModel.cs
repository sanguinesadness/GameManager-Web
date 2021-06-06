using System;
using System.Collections.Generic;

namespace GameManager.ViewModels
{
    public class UserInfoViewModel
    {
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        public List<string> Roles { get; set; }
    }
}