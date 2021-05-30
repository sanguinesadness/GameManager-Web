namespace GameManager.Models
{
    public class Item
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public virtual ItemCategory ItemCategory { get; set; }
        public int ItemCategoryId { get; set; }
        
        public string Description { get; set; }

        public string Icon { get; set; }
        
        public int Price { get; set; }
    }
}