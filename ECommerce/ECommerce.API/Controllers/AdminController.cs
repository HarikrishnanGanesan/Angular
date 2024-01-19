using ECommerce.API.DataAccess;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IDataAccess dataAccess;
        private readonly IConfiguration configuration;

        public AdminController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            this.configuration = configuration;
        }
        [HttpGet("GetProducts")]
        public IActionResult GetProducts(string category, string subcategory, int count)
        {
            var products = dataAccess.GetProducts(category, subcategory, count);

            return Ok(products);
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProduct([FromBody] Product product)
        {
            product.CreatedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);
            product.ModifiedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);

            var result = dataAccess.InsertProduct(product);

            return Ok(result);
        }

        [HttpPut("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            var existingProduct = dataAccess.GetProduct(id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Title = product.Title;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.ModifiedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);

            var result = dataAccess.UpdateProduct(existingProduct);

            return Ok(result);
        }

        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var existingProduct = dataAccess.GetProduct(id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            var result = dataAccess.DeleteProduct(existingProduct);

            return Ok(result);
        }

        [HttpGet("GetProductCategory/{id}")]
        public IActionResult GetProductCategory(int id)
        {
            var productCategory = dataAccess.GetProductCategory(id);

            if (productCategory == null)
            {
                return NotFound();
            }

            return Ok(productCategory);
        }
        
        [HttpPost("AddCategory")]
        public IActionResult AddCategory([FromBody] ProductCategory category)
        {
            var result = dataAccess.InsertCategory(category);

            return Ok(result);
        }

        [HttpPut("UpdateCategory/{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] ProductCategory category)
        {
            var existingCategory = dataAccess.GetProductCategory(id);

            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Category = category.Category;
            existingCategory.SubCategory = category.SubCategory;

            var result = dataAccess.UpdateCategory(existingCategory);

            return Ok(result);
        }

        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var existingCategory = dataAccess.GetProductCategory(id);

            if (existingCategory == null)
            {
                return NotFound();
            }

            var result = dataAccess.DeleteCategory(existingCategory);

            return Ok(result);
        }

    }
}
