using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GameManager.Models;
using GameManager.ViewModels;
using Microsoft.AspNetCore.Http;

namespace GameManager.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

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
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userManager.FindByIdAsync(userId).Result;
            
            return PartialView(user);
        }

        public async Task<IActionResult> EditUser(string id, string email, DateTime birthdate,
                                            int genderId, string oldPassword, string newPassword)
        {
            User user = await _userManager.FindByIdAsync(id);
            if (user is null)
            {
                return NotFound("Пользователь не найден.");
            }

            var passwordConfirmResult = _signInManager.CheckPasswordSignInAsync(user, oldPassword, false);

            if (!passwordConfirmResult.Result.Succeeded)
            {
                return Problem("Неверный пароль.", statusCode: 400);
            }
            
            user.Email = email;
            user.BirthDate = birthdate;
            user.GenderId = genderId;

            var dataEditResult = _userManager.UpdateAsync(user);

            if (!dataEditResult.Result.Succeeded)
            {
                return Problem("Неизвестная ошибка во время обновления данных пользователя.", statusCode: 500);
            }
            
            var passwordEditResult = _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (!passwordConfirmResult.Result.Succeeded)
            {
                return Problem("Неизвестная ошибка во время обновления пароля пользователя.");
            }

            return Ok();
        }
    }
}
