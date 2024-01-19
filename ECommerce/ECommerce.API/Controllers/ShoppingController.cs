// ShoppingController.cs
using ECommerce.API.DataAccess;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IDataAccess dataAccess;
        private readonly IConfiguration configuration;

        public ShoppingController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            this.configuration = configuration;
        }

        [HttpGet("GetCategoryList")]
        public IActionResult GetCategoryList()
        {
            var result = dataAccess.GetProductCategories();
            return Ok(result);
        }

        [HttpGet("GetProducts")]
        public IActionResult GetProducts(string category, string subcategory, int count)
        {
            var result = dataAccess.GetProducts(category, subcategory, count);
            return Ok(result);
        }

        [HttpGet("GetProduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            var result = dataAccess.GetProduct(id);
            return Ok(result);
        }

        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody] User user)
        {
            user.CreatedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);
            user.ModifiedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);

            var result = dataAccess.InsertUser(user);

            string message = result ? "Registered" : "email not available";
            return Ok(message);
        }
        
        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (string.IsNullOrEmpty(token))
                token = "invalid";

            return Ok(token);
        }

        [HttpPost("InsertReview")]
        public IActionResult InsertReview([FromBody] Review review)
        {
            review.CreatedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);
            dataAccess.InsertReview(review);
            return Ok("inserted");
        }

        [HttpGet("GetProductReviews/{productId}")]
        public IActionResult GetProductReviews(int productId)
        {
            var result = dataAccess.GetProductReviews(productId);
            return Ok(result);
        }

        [HttpPost("InsertCartItem/{userid}/{productid}/{quantity}")]
        public IActionResult InsertCartItem(int userid, int productid, int quantity)
        {
            var result = dataAccess.InsertCartItem(userid, productid, quantity);
            return Ok(result ? "inserted" : "not inserted");
        }
        
        [HttpPut("UpdateCartItemQuantity/{userId}/{productId}/{quantity}")]
        public IActionResult UpdateCartItemQuantity(int userId, int productId, int quantity)
        {
            // Check if the quantity is 0 or below 0
            if (quantity <= 0)
            {
                bool removed = dataAccess.RemoveCartItem(userId, productId);
                return Ok(removed ? "removed" : "not removed");
            }

            bool result = dataAccess.UpdateCartItemQuantity(userId, productId, quantity);
            return Ok(result);
        }


        [HttpDelete("RemoveCartItem/{userid}/{productid}")]
        public IActionResult RemoveCartItem(int userid, int productid)
        {
            bool result = dataAccess.RemoveCartItem(userid, productid);
            return Ok(result ? "removed" : "not removed");
        }

        [HttpPut("IncrementCartItemQuantity/{userid}/{productid}")]
        public IActionResult IncrementCartItemQuantity(int userid, int productid)
        {
            bool result = dataAccess.IncrementCartItemQuantity(userid, productid);
            return Ok(result ? "incremented" : "not incremented");
        }

        [HttpPut("DecrementCartItemQuantity/{userid}/{productid}")]
        public IActionResult DecrementCartItemQuantity(int userid, int productid, int quantity)
        {
            bool result = dataAccess.DecrementCartItemQuantity(userid, productid, quantity);
            return Ok(result ? "decremented" : "not decremented");
        }

        [HttpGet("GetActiveCartOfUser/{id}")]
        public IActionResult GetActiveCartOfUser(int id)
        {
            var result = dataAccess.GetActiveCartOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetAllPreviousCartsOfUser/{id}")]
        public IActionResult GetAllPreviousCartsOfUser(int id)
        {
            var result = dataAccess.GetAllPreviousCartsOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetPaymentMethods")]
        public IActionResult GetPaymentMethods()
        {
            var result = dataAccess.GetPaymentMethods();
            return Ok(result);
        }

        [HttpPost("InsertPayment")]
        public IActionResult InsertPayment(Payment payment)
        {
            payment.CreatedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);
            var id = dataAccess.InsertPayment(payment);
            return Ok(id.ToString());
        }

        [HttpPost("InsertOrder")]
        public IActionResult InsertOrder(Order order)
        {
            order.CreatedAt = DateTime.Now.ToString(configuration["Constants:DateFormat"]);
            var id = dataAccess.InsertOrder(order);
            return Ok(id.ToString());
        }

    }
}
