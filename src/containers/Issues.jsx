import useUrl from '../hooks/use-url';
import useFetch from '../hooks/use-fetch';
import { Loader, Issue, Error, Pagination } from '../components';
import { getTotalPages } from '../utils/helper';

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
              key={issue.html_url}
              url={issue.html_url}
              labels={issue.labels}
              title={issue.title}
            />
          ))}
        </div>
      )}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={getTotalPages(data.total_count)}
          onChange={changePage}
        />
      )}
    </div>
  );
};

export default Issues;
