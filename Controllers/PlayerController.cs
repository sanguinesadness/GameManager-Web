using Microsoft.AspNetCore.Mvc;

namespace GameManager.Controllers
{
    public class PlayerController : Controller
    {
        [HttpGet]
        public IActionResult MyCharacters()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Game()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Shop()
        {
            return View();
        }
    }
}
