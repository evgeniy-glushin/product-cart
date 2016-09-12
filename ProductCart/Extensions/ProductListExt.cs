using System;
using System.Collections.Generic;
using System.Linq;
using ProductCart.Entities;
using ProductCart.ViewModels;

namespace ProductCart.Extensions
{
    public static class ProductListExt
    {
        public static PagedResult<Product> ToPagedResult<T>(this IEnumerable<Product> rows,
            int page,
            int pageSize,
            Func<Product, T> orderBy)
        {
            PagedResult<Product> pagedResult = new PagedResult<Product>
            {
                Page = page,
                Total = (int)Math.Ceiling(rows.Count() * 1.0 / pageSize * 1.0),
                Rows = rows.OrderBy(orderBy)
                           .Skip((page - 1) * pageSize)
                           .Take(pageSize)
            };

            return pagedResult;
        }
    }
}