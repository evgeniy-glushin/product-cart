using System.Collections.Generic;
using ProductCart.Entities;

namespace ProductCart.Repositories
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetAll();
    }
}