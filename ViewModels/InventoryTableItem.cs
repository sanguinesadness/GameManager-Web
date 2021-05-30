using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameManager.ViewModels
{
    public class InventoryTableItem
    {
        public int Number { get; set; }

        public string Icon { get; set; }

        public string Name { get; set; }

        public int Amount { get; set; }
    }
}
