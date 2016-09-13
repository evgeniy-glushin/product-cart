using System;
using System.Collections.Generic;
using System.Linq;
using ProductCart.Entities;
using ProductCart.ViewModels;

namespace ProductCart.Extensions
{
    public static class ProductListExt
    {
        /// <summary>
        /// Gets paged result for the data. 
        /// </summary>
        /// <typeparam name="TOrderByParam">Type of property we wanna sort by.</typeparam>
        /// <param name="rows">Source data.</param>
        /// <param name="page">The page.</param>
        /// <param name="pageSize">The size of the page.</param>
        /// <param name="orderBy">Order by delegate.</param>
        public static PagedResult<Product> ToPagedResult<TOrderByParam>(this IEnumerable<Product> rows,
            int page,
            int pageSize,
            Func<Product, TOrderByParam> orderBy)
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