export const PAGINATION_TYPE = {
    PAGINATION: 'page',
    CONTINUATION: 'continuation',
};

export const PAGINATION_MAP = {
    [PAGINATION_TYPE.PAGINATION]: {
        hasMoreItems: ({page_number: pageNumber, page_count: pageCount}) =>
            pageNumber >= pageCount,
        getNextPage: ({page_number: pageNumber}) => pageNumber + 1,
        initialPageId: 1,
    },
    [PAGINATION_TYPE.CONTINUATION]: {
        donePredicate: ({has_more_items: hasMoreItems}) => !hasMoreItems,
        getNextPage: ({continuation}) => continuation,
        initialPageId: null,
    },
};
