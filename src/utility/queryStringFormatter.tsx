import qs from "qs";
import { QueryParams } from "../models/queryParams";

export default function queryStringFormatter(params: QueryParams): string {
  const { pagination, ...restParams } = params;
  const paginationParams = qs.stringify(pagination, { encode: false });
  const queryParams = qs.stringify(restParams, { encode: false });
  const queryString = paginationParams ? `${queryParams}&${paginationParams}` : queryParams;

  return queryString;
}