using System.ComponentModel.DataAnnotations;

namespace GameManager.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }

        public int CharacterId { get; set; }
        public virtual Character Character { get; set;}

        public int ItemId { get; set; }
        public virtual Item Item { get; set; }

        public int Amount { get; set; }
    }
}
