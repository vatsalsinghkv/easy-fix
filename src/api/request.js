import { ISSUE_PER_PAGE, ISSUE_URL, LABELS, QUERIES } from '../utils/config';

export const request = {
  searchIssues(lang, page, sortBy) {
    return `${ISSUE_URL}?q=${QUERIES.join(',')}+state:open${
      lang && lang !== 'all' ? '+language:' + lang : ''
    }+label:${LABELS.join(',')}&per_page=${ISSUE_PER_PAGE}&page=${page}&sort=${
      sortBy.sortKey
    }&order=${sortBy.order}`;
  },
};

export default request;
