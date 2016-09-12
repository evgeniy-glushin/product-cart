using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductCart.ViewModels
{
    public class PagedResult<T> where T : class
    {
        public IEnumerable<T> Rows { get; set; }
        public int Total { get; set; }
        public int Page { get; set; }
    }
}