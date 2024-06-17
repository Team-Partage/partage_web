import { type NextRequest } from 'next/server';

export function getSearchQuery(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get(`query`);
  return query;
}
