using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GameManager.Models;
using GameManager.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace GameManager.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        private User CurrentUser
        {
            get
            {
                var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = _userManager.FindByIdAsync(userId).Result;

                return user;
            }
        }

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View(new RegisterViewModel());
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User()
                {
                    UserName = model.UserName,
                    BirthDate = model.BirthDate,
                    Email = model.Email,
                    GenderId = model.Gender,
                    LastConnection = DateTime.Now
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Player");

                    model.IsSucceeded = true;
                    return View(model);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            return View(new LoginViewModel { ReturnUrl = returnUrl });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, false);

                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else
                    {
                        User user = _userManager.FindByNameAsync(model.UserName).Result;
                        var userRoles = _userManager.GetRolesAsync(user).Result;

                        if (userRoles.Contains("Admin"))
                        {
                            return RedirectToAction("Players", "Admin");
                        }
                        else
                        {
                            return RedirectToAction("MyCharacters", "Player");
                        }
                    }
                }
                else
                {
                    model.ErrorMessage = "Проверьте правильность написания логина и пароля.";
                    ModelState.AddModelError(string.Empty, model.ErrorMessage);
                }
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }
        
        [HttpGet]
        public IActionResult Account()
        {
            var user = CurrentUser;
            var model = new EditUserViewModel()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                BirthDate = user.BirthDate,
                GenderId = user.GenderId
            };
            
            return PartialView(model);
        }

        [HttpGet]
        public IActionResult GetCurrentUserData()
        {
            var user = CurrentUser;
            var model = new EditUserViewModel()
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                BirthDate = user.BirthDate,
                GenderId = user.GenderId
            };

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult VerifyCurrentPassword(string oldPassword)
        {
            var passwordConfirmResult = _signInManager.CheckPasswordSignInAsync(CurrentUser, oldPassword, false).Result;
            if (!passwordConfirmResult.Succeeded)
            {
                return Json("Пароли не совпадают.");
            }

            return Json(true);
        }
        
        [HttpPut]
        public async Task<IActionResult> EditUser(EditUserViewModel model)
        {
            User user = await _userManager.FindByIdAsync(model.Id);
            if (user is null)
            {
                return NotFound("Пользователь не найден.");
            }
            
            var passwordConfirmResult = _signInManager.CheckPasswordSignInAsync(user, model.OldPassword, false).Result;
            if (!passwordConfirmResult.Succeeded)
            {
                return Problem("Введен неверный пароль Повторите попытку.");
            }

            user.Email = model.Email;
            user.BirthDate = model.BirthDate;
            user.GenderId = model.GenderId;

            var dataEditResult = _userManager.UpdateAsync(user).Result;
            if (!dataEditResult.Succeeded)
            {
                return Problem("Введены неверные данные.");
            }

            if (!string.IsNullOrEmpty(model.NewPassword))
            {
                var passwordEditResult = _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword).Result;
                if (!passwordEditResult.Succeeded)
                {
                    return Problem("Неизвестная ошибка при смене пароля.");
                }
            }
            
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult VerifyEmail(string email)
        {
            string normalizedEmail = _userManager.NormalizeEmail(email);
            var user = _userManager.Users.FirstOrDefault(u => u.NormalizedEmail == normalizedEmail);
            
            if (user != null)
            {
                return Json("Данный адрес уже используется.");
            }

            return Json(true);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult VerifyUsername(string username)
        {
            Regex regex = new Regex("^[a-zA-Z0-9]+$");

            string normalizedUsername = _userManager.NormalizeName(username);
            var user = _userManager.Users.FirstOrDefault(u => u.NormalizedUserName == normalizedUsername);
            
            if (username.Length < 3 || username.Length > 30)
            {
                return Json("Введите от 3 до 30 символов.");
            }
            else if (!regex.IsMatch(username))
            {
                return Json("Разрешены только цифры и символы латинского алфавита.");
            }
            else if (user != null)
            {
                return Json("Данное имя уже используется.");
            }

            return Json(true);
        }
    }
}
