namespace ProductCart.ViewModels
{
    public class GetProductsVm
    {
        public int Page { get; set; }
        public int PageSize { get; set; }

        public int? CategoryId { get; set; }
        public string SearchTxt { get; set; }
    }
}