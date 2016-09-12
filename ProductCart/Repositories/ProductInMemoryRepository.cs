using System;
using System.Collections.Generic;
using System.Linq;
using ProductCart.Entities;

namespace ProductCart.Repositories
{
    public class ProductInMemoryRepository : IProductRepository
    {
        static List<Product> data = new List<Product>
            {
                //Desktops
                new Product { Id = 1, Name = "Digital Storm VANQUISH 3 Custom Performance PC", Rating = 1, Price = 1259.0, Image = "0000022_digital-storm-vanquish-3-custom-performance-pc_415.jpeg", CategoryId = 1 },
                new Product { Id = 2, Name = "Lenovo IdeaCentre 600 All-in-One PC", Rating = 1, Price = 500.0, Image = "0000023_lenovo-ideacentre-600-all-in-one-pc_415.jpeg", CategoryId = 1 },
                //Electronics                
                new Product { Id = 4, Name = "Nikon D5500 DSLR", Rating = 1, Price = 630.0, Image = "0000035_nikon-d5500-dslr_415.jpeg", CategoryId = 2 },
                new Product { Id = 5, Name = "Portable Sound Speakers", Rating = 4, Price = 37, Image = "0000048_portable-sound-speakers_415.jpeg", CategoryId = 2 },
                new Product { Id = 7, Name = "Universal 7-8 Inch Tablet Cover", Rating = 4, Price = 39.0, Image = "0000047_universal-7-8-inch-tablet-cover_415.jpeg", CategoryId = 2 },
                new Product { Id = 11, Name = "Leica T Mirrorless Digital Camera", Rating = 3, Price = 1800.0, Image = "0000039_leica-t-mirrorless-digital-camera_415.jpeg", CategoryId = 2 },
                new Product { Id = 12, Name = "HTC One M8 Android L 5.0 Lollipop", Rating = 3, Price = 1500.0, Image = "0000041_htc-one-m8-android-l-50-lollipop_415.jpeg", CategoryId = 2 },
                new Product { Id = 13, Name = "HTC One Mini Blue", Rating = 4, Price = 1350.0, Image = "0000042_htc-one-mini-blue_415.jpeg", CategoryId = 2 },
                new Product { Id = 14, Name = "Nokia Lumia 1020", Rating = 2, Price = 1350.0, Image = "0000044_nokia-lumia-1020_415.jpeg", CategoryId = 2 },
                //Notebooks
                new Product { Id = 8, Name = "Apple MacBook Pro 13-inch", Rating = 5, Price = 1800.0, Image = "0000024_apple-macbook-pro-13-inch_415.jpeg", CategoryId = 3 },
                new Product { Id = 9, Name = "Asus N551JK-XO076H Laptop", Rating = 5, Price = 1500.0, Image = "0000026_asus-n551jk-xo076h-laptop_415.jpeg", CategoryId = 3 },
                new Product { Id = 10, Name = "HP Spectre XT Pro UltraBook", Rating = 4, Price = 1350.0, Image = "0000028_hp-spectre-xt-pro-ultrabook_415.jpeg", CategoryId = 3 },
            };

        public Product Find(int id)
        {
            return data.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Product> GetAll()
        {
            return data;
        }
    }
}