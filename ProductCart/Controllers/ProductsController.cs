using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ProductCart.Entities;
using ProductCart.Repositories;

namespace ProductCart.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductsController : ApiController
    {
        private IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet, Route("")]
        public IEnumerable<Product> Get()

        {
            return _productRepository.GetAll();
        }
        
        [HttpGet, Route("{name}")]
        public IEnumerable<Product> Get(string name)
        {
            return _productRepository.GetAll()
                .Where(p => p.Name.Contains(name));
        }

        [HttpGet, Route("{categoryId:int}")]
        public IEnumerable<Product> Get(int categoryId)
        {
            return _productRepository.GetAll()
                .Where(p => p.CategoryId == categoryId);
        }

        [HttpPost, Route("")]
        public IHttpActionResult Post([FromBody] UpdateRatingVm input)
        {
            Product product = _productRepository.Find(input.Id);
            if (product == null)
                return NotFound();

            product.Rating = input.Value;

            return Ok(product);
        }
    }
}
