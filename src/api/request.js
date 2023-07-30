import { ISSUE_PER_PAGE, ISSUE_URL, LABELS, QUERIES } from '../utils/config';

export const request = {
  searchIssues: {
    url: `${ISSUE_URL}?q=${QUERIES.join(',')}+state:open+label:${LABELS.join(
      ','
    )}&per_page=${ISSUE_PER_PAGE}`,
    parameters: {
      language(langs) {
        return `&language=${langs.join(',')}`;
      },
      page(no = 1) {
        return `&page=${no}`;
      },
    },
  },
};

export default request;
