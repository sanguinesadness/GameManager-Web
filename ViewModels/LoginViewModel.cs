using System.ComponentModel.DataAnnotations;

namespace GameManager.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [Display(Name = "Имя пользователя")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Поле обязательно для заполнения.")]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запомнить пароль")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }

        public string ErrorMessage { get; set; }
    }
}
