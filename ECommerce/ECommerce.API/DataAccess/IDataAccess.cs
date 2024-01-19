using ECommerce.API.Models;
using System.Collections.Generic;

namespace ECommerce.API.DataAccess
{
    public interface IDataAccess
    {
        //user
        List<ProductCategory> GetProductCategories();
        ProductCategory GetProductCategory(int id);
        Offer GetOffer(int id);
        List<Product> GetProducts(string category, string subcategory, int count); 
        Product GetProduct(int id);
        bool InsertUser(User user);
        string IsUserPresent(string email, string password);
        void InsertReview(Review review);
        List<Review> GetProductReviews(int productId);
        User GetUser(int id);
        bool InsertCartItem(int userId, int productId, int quantity);
        bool UpdateCartItemQuantity(int userId, int productId, int quantity);
        bool IncrementCartItemQuantity(int userId, int productId);
        bool DecrementCartItemQuantity(int userId, int productId, int quantity);
        bool RemoveCartItem(int userId, int productId);
        Cart GetActiveCartOfUser(int userid);
        Cart GetCart(int cartid);
        List<Cart> GetAllPreviousCartsOfUser(int userid);
        List<PaymentMethod> GetPaymentMethods();
        int InsertPayment(Payment payment);
        int InsertOrder(Order order);
        //admin
        bool InsertProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(Product product);
        bool InsertCategory(ProductCategory category);
        bool UpdateCategory(ProductCategory category);
        bool DeleteCategory(ProductCategory category);
    }
}
