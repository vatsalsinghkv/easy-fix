import { Error, Issue, Loader, Pagination } from '@/components';
import useFetch from '@/lib/hooks/use-fetch';
import { useUrl } from '@/lib/hooks/use-url';
import { MAX_ISSUES_ALLOWED } from '@/lib/utils/config';
import { getTotalPages } from '@/lib/utils/helper';

const Issues = () => {
  const { url, page, changePage } = useUrl();
  const { data, loading, error } = useFetch(url);

  return (
    <div>
      {error && (
        <Error title='Oops! Something went wrong'>{error.message}</Error>
      )}

      {loading && (
        <div className='flex items-center justify-center h-[65vh] md:h-[80vh]'>
          <Loader />
        </div>
      )}

      {!loading && !error && !data?.items.length && (
        <Error title='No issues found!'>Please try again after sometime.</Error>
      )}

      {!error && !loading && (
        <div className='py-5 space-y-3'>
          {data.items.map((issue) => (
            <Issue
              repoUrl={issue.repository_url}
              key={issue.html_url}
              url={issue.html_url}
              labels={issue.labels}
              title={issue.title}
              date={issue.created_at}
            />
          ))}
        </div>
      )}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={getTotalPages(
            data.total_count > MAX_ISSUES_ALLOWED
              ? MAX_ISSUES_ALLOWED
              : data.total_count
          )}
          onChange={changePage}
        />
      )}
    </div>
  );
};

export default Issues;
