import { Error, Issue, Label, Loader, Pagination } from '@/components';
import useAsync from '@/lib/hooks/useAsync';
import { getTotalPages, toId } from '@/lib/utils';
import httpGateway from '@/lib/utils/HttpGateway';
import { MAX_ISSUES_ALLOWED } from '@/lib/utils/config';
import { githubIssueSearchResponse } from '@/models/GithubIssueSearch';
import { useUrlValues } from '@/providers/urlProvider';
import { useEffect } from 'react';
import { css } from 'styled-system/css';

const Issues = () => {
  const { dispatch, page, url } = useUrlValues();
  const { data, error, isIdle, isPending, run } = useAsync(
    (signal) => httpGateway.Get({ url, signal }, githubIssueSearchResponse),
    { autoFetch: true }
  );

  const handlePageChange = (payload: number) => {
    dispatch({ type: 'update-page', payload });
  };

  useEffect(() => {
    run();
  }, [url]);

  if (isPending || isIdle) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          h: '65vh',
          md: { h: '80vh' },
        })}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error title='Oops! Something went wrong'>{error.message}</Error>
      </div>
    );
  }

  if (data?.items.length === 0) {
    return (
      <Error title='No issues found!'>Please try again after sometime.</Error>
    );
  }

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          py: 4,
        })}
      >
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
              <Label
                key={toId(label.name)}
                className={css({ mr: '1.5', mt: '2' })}
              >
                {label.name}
              </Label>
            ))}
          </Issue>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={getTotalPages(
          data.total_count > MAX_ISSUES_ALLOWED
            ? MAX_ISSUES_ALLOWED
            : data.total_count
        )}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Issues;
