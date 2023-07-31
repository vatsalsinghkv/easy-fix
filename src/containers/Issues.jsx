import { Loader, Issue, Pagination } from '../components';
import useUrl from '../hooks/use-url';
import useFetch from '../hooks/use-fetch';
import { getTotalPages } from '../utils/helper';

const Issues = () => {
  const { url, page, changePage } = useUrl();
  const { data, loading, error } = useFetch(url);

  if (error) return <h1>{error.message}</h1>;

  if (loading)
    return (
      <div className=' flex items-center justify-center h-[80vh]'>
        <Loader />
      </div>
    );

  if (!data) return <h1>no data</h1>;

  return (
    <>
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
      <Pagination
        currentPage={page}
        totalPages={getTotalPages(data.total_count)}
        onChange={changePage}
      />
    </>
  );
};

export default Issues;
