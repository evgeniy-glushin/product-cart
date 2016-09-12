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
        
        [HttpPut, Route("")]
        public IHttpActionResult Put([FromBody] UpdateRatingVm input)
        {            
            Product product = _productRepository.Find(input.Id);
            if (product == null)
                return NotFound();

            product.Rating = input.Value;

            return Ok(product);
        }
    }
}
