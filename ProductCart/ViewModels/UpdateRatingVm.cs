using System.ComponentModel.DataAnnotations;

namespace ProductCart.Controllers
{
    public class UpdateRatingVm
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Range(1, 5)]
        public int Value { get; set; }
    }
}