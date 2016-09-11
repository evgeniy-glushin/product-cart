using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductCart.Entities;

namespace ProductCart.Repositories
{
    public class CategoryInMemoryRepository : ICategoryRepository
    {
        public IEnumerable<Category> GetAll()
        {
            return new List<Category>
            {
                new Category { Id = 1, Name = "Desktops" },
                new Category { Id = 2, Name = "Electronics" },
                new Category { Id = 3, Name = "Notebooks" },
            };
        }
    }
}