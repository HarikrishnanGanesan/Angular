using Microsoft.EntityFrameworkCore;
using ECommerce.API.Models;

namespace ECommerce.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        
        public DbSet<ProductCategory>? ProductCategories { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<User>? Users { get; set; }
        public DbSet<Review>? Reviews { get; set; }
        public DbSet<Offer>? Offers { get; set; }
        public DbSet<Cart>? Carts { get; set; }
        public DbSet<CartItem>? CartItems { get; set; }
        public DbSet<PaymentMethod>? PaymentMethods { get; set; }
        public DbSet<Payment>? Payments { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
