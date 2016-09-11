using System.Collections.Generic;
using System.Web.Http;
using ProductCart.Entities;
using ProductCart.Repositories;

namespace ProductCart.Controllers
{
    [RoutePrefix("api/categories")]
    public class CategoriesController : ApiController
    {
        private ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository productRepository)
        {
            _categoryRepository = productRepository;
        }

        [HttpGet, Route("")]
        public IEnumerable<Category> Get()
        {
            return _categoryRepository.GetAll();
        }
    }
}
