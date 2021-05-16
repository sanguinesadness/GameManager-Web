using System;
using System.ComponentModel.DataAnnotations;

namespace GameManager.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [StringLength(30, ErrorMessage = "Поле должно иметь длину от 3 до 30 символов.", MinimumLength = 3)]
        [Display(Name = "Имя пользователя")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [DataType(DataType.Password)]
        [StringLength(30, ErrorMessage = "Поле должно иметь длину от 6 до 30 символов.", MinimumLength = 6)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают.")]
        [DataType(DataType.Password)]
        [Display(Name = "Повторить пароль")]
        public string PasswordConfirm { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [Display(Name = "Электронная почта")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [DataType(DataType.Date, ErrorMessage = "Неверное значение даты.")]
        [Display(Name = "Дата рождения")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [Display(Name = "Пол")]
        public int Gender { get; set; }

        public bool IsSucceeded { get; set; }
    }
}
