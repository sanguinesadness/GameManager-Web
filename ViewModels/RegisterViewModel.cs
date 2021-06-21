using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace GameManager.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Remote(action: "VerifyUsername", controller: "Account")]
        [Display(Name = "Имя пользователя")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.Password)]
        [StringLength(30, ErrorMessage = "Введите от 6 до 30 символов.", MinimumLength = 6)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DataType(DataType.Password)]
        [Display(Name = "Повторить пароль")]
        public string PasswordConfirm { get; set; }
        
        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Remote(action: "VerifyEmail", controller: "Account")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Неверный формат электронного адреса")]
        [Display(Name = "Электронная почта")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [DataType(DataType.Date, ErrorMessage = "Неверное значение даты")]
        [Display(Name = "Дата рождения")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения")]
        [Display(Name = "Пол")]
        public int Gender { get; set; }

        public bool IsSucceeded { get; set; }
    }
}
