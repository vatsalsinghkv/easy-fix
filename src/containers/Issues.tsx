import { Error, Issue, Label, Loader, Pagination } from '@/components';
import useFetch from '@/lib/hooks/use-fetch';
import { getTotalPages, toId } from '@/lib/utils';
import { MAX_ISSUES_ALLOWED } from '@/lib/utils/config';
import { useUrlValues } from '@/providers/urlProvider';

const Issues = () => {
  const { dispatch, page, url } = useUrlValues();
  const { data, loading, error } = useFetch(url);

  const handlePageChange = (payload: number) => {
    dispatch({ type: 'update-page', payload });
  };

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
              date={issue.created_at}
              key={issue.html_url}
              repoUrl={issue.repository_url}
              title={issue.title}
              url={issue.html_url}
              comments={issue.comments}
            >
              {issue.labels.map((label) => (
                <Label key={toId(label.name)} className='mr-1.5 mt-2'>
                  {label.name}
                </Label>
              ))}
            </Issue>
          ))}
        </div>
      )}
      {data ? (
        <Pagination
          currentPage={page}
          totalPages={getTotalPages(
            data.total_count > MAX_ISSUES_ALLOWED
              ? MAX_ISSUES_ALLOWED
              : data.total_count
          )}
          onChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};

export default Issues;
