using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace GameManager.ViewModels
{
    public class EditUserViewModel
    {
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Remote(action: "VerifyUsername", controller: "Account")]
        [Display(Name = "Имя пользователя")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Неверный формат электронного адреса")]
        [Display(Name = "Электронная почта")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.Date, ErrorMessage = "Неверное значение даты")]
        [Display(Name = "Дата рождения")]
        public DateTime BirthDate { get; set; }

        public int GenderId { get; set; }
        
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.Password)]
        [Display(Name = "Текущий пароль")]
        [Remote(action: "VerifyCurrentPassword", controller: "Account")]
        public string OldPassword { get; set; }
        
        [DataType(DataType.Password)]
        [StringLength(30, ErrorMessage = "Введите от 6 до 30 символов или оставьте поле пустым", MinimumLength = 6)]
        [Display(Name = "Новый пароль")]
        public string NewPassword { get; set; }
    }
}
