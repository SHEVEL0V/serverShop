/** @format */
import productSchema from "../../../db/schema/product.js";
import { searchParams } from "../../../services/products/searchParams.js";
import { sortParams } from "../../../services/products/sortParams.js";

export default async (root, args, context) => {
  const { limit, sort, page } = args.query || {};

  const results = await productSchema
    //----------find product and sort and skip and limit ----------//
    .find(searchParams(args?.query))
    .sort(sortParams(sort))
    .skip(page ? limit * (page - 1) : null)
    .limit((limit = 4));

  //--------count products--------//
  const count = await productSchema.countDocuments(searchParams(args?.query));

  return { count, results };
};
