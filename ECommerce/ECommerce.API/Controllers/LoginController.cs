using ECommerce.API.DataAccess;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly IDataAccess dataAccess;
        private readonly IConfiguration configuration;

        public LoginController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            this.configuration = configuration;
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
        

        [HttpPost("AdminLogin")]
        public IActionResult AdminLogin([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            return Ok(token);
        }


        [HttpPost("Login")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            return Ok(token);
        }
    }
}
