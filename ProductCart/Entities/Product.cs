﻿namespace ProductCart.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Rating { get; set; }
        public int CategoryId { get; set; }
    }

}