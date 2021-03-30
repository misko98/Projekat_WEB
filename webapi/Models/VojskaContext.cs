using Microsoft.EntityFrameworkCore;
namespace webapi.Models
{
    public class VojskaContext : DbContext 
    {
        public DbSet<Vojska> vojske { get; set;}
        public DbSet<Puk> pukovi { get; set;}
        public DbSet<Bataljon> bataljoni { get; set;}
        
        public VojskaContext(DbContextOptions options) : base(options){
            
        }

        protected override void OnModelCreating(ModelBuilder mb){

            mb.Entity<Vojska>()
            .HasMany(vojska => vojska.Pukovi)
            .WithOne(puk => puk.Vojska)
            .OnDelete(DeleteBehavior.Cascade);

            mb.Entity<Puk>()
            .HasMany(puk => puk.Bataljoni)
            .WithOne(bataljon => bataljon.Puk)
            .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(mb);
        }
    }
}