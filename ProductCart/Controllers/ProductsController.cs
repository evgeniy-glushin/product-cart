using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ProductCart.Entities;
using ProductCart.Extensions;
using ProductCart.Repositories;
using ProductCart.ViewModels;

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
        public PagedResult<Product> Get([FromUri]GetProductsVm input)
        {
            var productsList = _productRepository.GetAll();

            if (input.CategoryId > 0)
                productsList = productsList.Where(p => p.CategoryId == input.CategoryId);

            if (!string.IsNullOrWhiteSpace(input.SearchTxt))
                productsList = productsList.Where(p => p.Name.Contains(input.SearchTxt));

            return productsList.ToPagedResult(input.Page, input.PageSize, p => p.Id);
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
