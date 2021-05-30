using GameManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameManager.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly GameManagerContext _db;

        public AdminController(GameManagerContext context)
        {
            _db = context;
        }

        [HttpGet]
        public IActionResult Players()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Reports()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Settings()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Account()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetTopRatingTable()
        {
            var result = await _db.Characters
                                  .Include(c => c.User)
                                  .Select(c => new 
                                  { 
                                      CharacterName = c.Name,
                                      c.Rating,
                                      c.User.UserName 
                                  })
                                  .OrderByDescending(c => c.Rating)
                                  .ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetRichestPlayersTableAsync()
        {
            var result = await _db.Characters
                                  .Include(c => c.User)
                                  .GroupBy(c => c.User.UserName)
                                  .Select(cl => new
                                  {
                                      UserName = cl.Key,
                                      CharacterCount = cl.Count(),
                                      TotalGold = cl.Sum(c => c.Gold)
                                  })
                                  .OrderByDescending(cl => cl.TotalGold)
                                  .ToListAsync();

            return Ok(result);
        }
    }
}