using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using GameManager.Models;
using GameManager.ViewModels;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System;

namespace GameManager.Controllers
{
    [Authorize(Roles = "Player")]
    public class PlayerController : Controller
    {
        private readonly GameManagerContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static Character _selectedCharacter;

        private string CurrentUserId => _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

        public PlayerController(GameManagerContext context, IHttpContextAccessor httpContextAccessor)
        {
            _db = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public IActionResult SelectCharacter(int id)
        {
            _selectedCharacter = _db.Characters.Find(id);

            if (_selectedCharacter is null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }    
        }

        [HttpGet]
        public IActionResult CheckSelectedCharacter()
        {
            if (_selectedCharacter is null)
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }

        [HttpGet]
        public async Task<IActionResult> MyCharactersAsync()
        {
            _selectedCharacter = null;

            List<Character> characters = await _db.Characters
                                                  .Where(c => c.UserId == CurrentUserId)
                                                  .Include(c => c.Hero)
                                                  .Include(c => c.CurrentLocation)
                                                  .Include(c => c.User)
                                                  .ToListAsync();

            List<Hero> heroes = await _db.Heroes
                                         .Include(h => h.HeroClass)
                                         .ToListAsync();

            ViewBag.Characters = characters;
            ViewBag.Heroes = heroes;

            return PartialView();
        }

        [HttpGet]
        public IActionResult GetSelectedCharacterInfo(int characterId)
        {
            Character character = _db.Characters
                                     .Where(c => c.Id == characterId)
                                     .Include(c => c.Hero)
                                     .Include(c => c.CurrentLocation)
                                     .FirstOrDefault();

            HeroClass heroClass = _db.HeroClasses.Find(character.Hero.HeroClassId); 

            MyCharacterInfoViewModel result = new()
            {
                Id = character.Id,
                CurrentLocation = character.CurrentLocation.Name,
                Level = character.Lvl,
                HeroClass = heroClass.Name,
                PlayedHours = character.PlayedHours,
                Gold = character.Gold,
                Rating = character.Rating,
                CreationDate = character.CreationDate
            };

            if (!_db.CharacterBans.Where(cb => cb.CharacterId == characterId).Any())
                result.Status = CharacterStatus.Active;
            else
                result.Status = CharacterStatus.Banned;

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult RemoveCharacter(int characterId)
        {
            Character character = _db.Characters.Find(characterId);

            if (character is null)
            {
                return Problem("Character with specified Id was not found.");
            }

            foreach (var inv in _db.Inventories.Where(inv => inv.CharacterId == characterId))
            {
                _db.Inventories.Remove(inv);
            }
            
            var result = _db.Characters.Remove(character);
            _db.SaveChanges();

            _selectedCharacter = null;

            return Ok(result.State.ToString());
        }

        [HttpPost]
        public IActionResult CreateCharacter(string characterName, int heroId)
        {
            int locationId = _db.Locations.FirstOrDefault().Id;

            Character character = new()
            {
                Name = characterName,
                UserId = CurrentUserId,
                HeroId = heroId,
                CurrentLocationId = locationId,
                CreationDate = DateTime.Now,
                Lvl = 1,
                Rating = 0,
                Gold = 0,
                PlayedHours = 0
            };

            var result = _db.Characters.Add(character);
            _db.SaveChanges();

            CharacterItemInfo characterItemInfo = new()
            {
                Id = result.Entity.Id,
                Name = result.Entity.Name,
                HeroIcon = _db.Heroes.Find(heroId).Icon
            };

            return Ok(characterItemInfo);
        }

        [HttpGet]
        public IActionResult GetSelectedHero(int heroId)
        {
            return Ok(_db.Heroes
                         .Where(h => h.Id == heroId)
                         .Include(h => h.HeroClass)
                         .FirstOrDefault());
        }

        [HttpGet]
        public IActionResult Game()
        {
            return PartialView();
        }

        [HttpGet]
        public IActionResult GetHeroes()
        {
            return Ok(_db.Heroes);
        }

        [HttpGet]
        public IActionResult GetMobs()
        {
            return Ok(_db.Mobs);
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(_db.Items);
        }

        [HttpGet]
        public IActionResult GetLocations()
        {
            return Ok(_db.Locations);
        }

        [HttpGet]
        public async Task<IActionResult> Shop()
        {
            if (_selectedCharacter is null)
            {
                return NoContent();
            }

            ViewBag.ItemCategories = await _db.ItemCategories.ToListAsync();
            ViewBag.SelectedCharacter = _db.Characters.Find(_selectedCharacter.Id);

            return PartialView();
        }

        [HttpGet]
        public IActionResult GetCategoryItems(int categoryId)
        {
            return Ok(_db.Items.Where(item => item.ItemCategoryId == categoryId));
        }

        [HttpPost]
        public IActionResult BuyItem(int characterId, int itemId, int amount)
        {
            Character character = _db.Characters.Find(characterId);
            Item item = _db.Items.Find(itemId);
            int totalPrice = item.Price * amount;

            if (character.Gold >= totalPrice)
            {
                character.Gold -= totalPrice;
            }
            else
            {
                return Problem("Character does not have enough gold on balance.");
            }

            // item exists in the inventory of selected character?
            bool itemExists = _db.Inventories.Where(i => i.CharacterId == characterId && i.ItemId == itemId).Any();

            if (itemExists)
            {
                var inventoryItem = _db.Inventories.Where(i => i.CharacterId == characterId && i.ItemId == itemId).FirstOrDefault();
                inventoryItem.Amount += amount;

                _db.Inventories.Update(inventoryItem);
            }
            else
            {
                Inventory newInventoryItem = new()
                {
                    CharacterId = characterId,
                    ItemId = itemId,
                    Amount = amount
                };

                _db.Inventories.AddAsync(newInventoryItem);
            }

            _db.SaveChanges();
            return Ok(character.Gold);
        }

        [HttpGet]
        public IActionResult GetCharacterItems(int characterId)
        {
            if (!_db.Characters.Where(c => c.Id == characterId).Any())
            {
                return NotFound();
            }

            var inventories = _db.Inventories.Where(inv => inv.CharacterId == characterId).Include(inv => inv.Item);

            List<InventoryTableItem> table = new List<InventoryTableItem>();

            int num = 1;
            foreach (var inventory in inventories)
            {
                table.Add(new InventoryTableItem()
                {
                    Number = num++,
                    Icon = inventory.Item.Icon,
                    Name = inventory.Item.Name,
                    Amount = inventory.Amount
                });
            }

            return Ok(table);
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
    }
}
