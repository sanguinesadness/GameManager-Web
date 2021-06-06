namespace GameManager.ViewModels
{
    public class CharactersTableItem
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Icon { get; set; }
        
        public int Level { get; set; }
        public int Gold { get; set; }
        
        public int Rating { get; set; }
        
        public CharacterStatus Status { get; set; }
    }
}