import { ISSUE_PER_PAGE, ISSUE_URL, LABELS, QUERIES } from '@/lib/utils/config';

export const request = {
  searchIssues(lang, page, sort, order) {
    return `${ISSUE_URL}?q=${QUERIES.join(',')}+state:open${
      lang && lang !== 'all' ? '+language:' + lang : ''
    }+label:${LABELS.join(
      ','
    )}&per_page=${ISSUE_PER_PAGE}&page=${page}&sort=${sort}&order=${order}`;
  },
};

export default request;
