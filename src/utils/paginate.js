import _ from 'lodash';

/**
 * Returns a sub-array of the given items, that is of length equal to the given
 * pageSize, and contains only those items that are located at the given
 * pageNumber.
 * @param {Object[]} items An Objects array.
 * @param {Number} pageNumber Pagination index.
 * @param {Number} pageSize Number of items per page.
 */
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
