using System.Collections.Generic;
using ProductCart.Entities;

namespace ProductCart.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
        Product Find(int id);
    }
}
