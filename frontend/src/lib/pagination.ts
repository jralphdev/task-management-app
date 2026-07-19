type PageItem = number | '...';

export const getPages = (page: number, total: number): PageItem[] => {
  // show all pages when there are only a few tasks
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // current page is near the beginning
  if (page < 3) {
    return [1, 2, 3, '...', total];
  }

  // current page is near the end
  if (page > total - 2) {
    return [1, '...', total - 2, total - 1, total];
  }

  // current page is in the middle
  return [1, '...', page - 1, page, page + 1, '...', total];
};
