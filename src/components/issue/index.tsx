import useAsync from '@/lib/hooks/useAsync';
import httpGateway from '@/lib/utils/HttpGateway';
import { githubRepositoryItem } from '@/models/GithubRepository';
import { PropsWithChildren } from 'react';
import { css, cx } from 'styled-system/css';

import IssueData from './IssueData';

type Props = {
  title: string;
  url: string;
  repoUrl: string;
  date: string;
  comments: number;
};

export const Issue = ({
  children,
  date,
  title,
  repoUrl,
  url,
  comments,
}: PropsWithChildren<Props>) => {
  const { data } = useAsync(
    (signal) => httpGateway.Get({ url: repoUrl, signal }, githubRepositoryItem),
    {
      autoFetch: true,
    }
  );

  return (
    <a
      className={cx(
        'group',
        css({
          borderColor: 'dark-3',
          borderWidth: '1px',
          display: 'block',
          minH: '105px',
          p: 4,
          rounded: 'md',
          _focus: {
            bg: 'bg-secondary',
          },
          _hover: {
            bg: 'bg-secondary',
          },
        })
      )}
      href={url}
      target='_blank'
      rel='noreferrer'
    >
      <IssueData
        date={date}
        fullName={data?.full_name}
        stargazersCount={data?.stargazers_count}
        comments={comments}
      />
      <h3
        className={css({
          fontSize: 'base',
          lineHeight: 'base',
          fontWeight: 'medium',
          color: 'dark-1',
          md: { fontSize: 'lg', lineHeight: 'lg' },
          _groupFocus: {
            color: 'accent',
          },
          _groupHover: {
            color: 'accent',
          },
        })}
      >
        {title}
      </h3>
      <div className={css({ display: 'flex', flexWrap: 'wrap' })}>
        {children}
      </div>
    </a>
  );
};

export default Issue;
