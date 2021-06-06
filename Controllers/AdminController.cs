using GameManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameManager.ViewModels;
using Microsoft.AspNetCore.Identity;

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
        public async Task<IActionResult> Players()
        {
            List<UserInfoViewModel> usersInfo = new List<UserInfoViewModel>();
            
            var userRoles = _db.UserRoles.ToList();
            var allRoles = _db.Roles.ToList();
            
            foreach (var user in _db.Users)
            {
                var result = userRoles.Where(ur => ur.UserId == user.Id)
                    .Join(allRoles, ur => ur.RoleId, r => r.Id,
                        (ur, r) => r.Name).ToList();

                var userInfo = new UserInfoViewModel()
                {
                    Id = user.Id,
                    Name = user.UserName,
                    Roles = result
                };
            
                usersInfo.Add(userInfo);
            }
            
            return PartialView(usersInfo);
        }

        [HttpGet]
        public IActionResult Reports()
        {
            return PartialView();
        }

        [HttpGet]
        public IActionResult Settings()
        {
            return PartialView();
        }

        [HttpGet]
        public IActionResult Account()
        {
            return PartialView();
        }

        [HttpGet]
        public IActionResult GetPlayerCharacters(string playerId)
        {
            List<Character> characters = _db.Characters.Where(c => c.UserId == playerId)
                                                       .Include(c => c.Hero).ToList();
            
            if (characters.Count == 0)
            {
                return NotFound();
            }

            List<CharactersTableItem> result = new List<CharactersTableItem>();

            foreach (var character in characters)
            {
                CharactersTableItem tableItem = new CharactersTableItem()
                {
                    Id = character.Id,
                    Name = character.Name,
                    Level = character.Lvl,
                    Icon = character.Hero.Icon,
                    Gold = character.Gold,
                    Rating = character.Rating
                };
            
                if (!_db.CharacterBans.Where(cb => cb.CharacterId == character.Id).Any())
                    tableItem.Status = CharacterStatus.Active;
                else
                    tableItem.Status = CharacterStatus.Banned;

                result.Add(tableItem);
            }

            return Ok(result);
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