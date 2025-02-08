import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginateDto } from '../dto/paginate.dto';

export async function paginate<T extends ObjectLiteral>(
  snapshot: SelectQueryBuilder<T>,
  page = 1,
  perPage = 10,
): Promise<PaginateDto<T>> {
  const skip = (page - 1) * perPage;
  const totalItems = await snapshot.getCount();
  const totalPages = Math.ceil(totalItems / perPage);
  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? Number(page) + 1 : null;

  return {
    data: await snapshot.skip(skip).take(perPage).getMany(),
    pagination: {
      currentPage: page,
      perPage,
      totalItems,
      previousPage,
      nextPage,
    },
  };
}
