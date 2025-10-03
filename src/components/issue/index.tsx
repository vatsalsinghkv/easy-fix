import useAsync from '@/lib/hooks/useAsync';
import httpGateway from '@/lib/utils/HttpGateway';
import { githubRepositoryItem } from '@/models/GithubRepository';
import { PropsWithChildren } from 'react';

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
    { autoFetch: true }
  );

  return (
    <a
      className='block p-6 border-2 rounded-xl border-dark-3 bg-bg-secondary/20 backdrop-blur-sm hover:bg-bg-secondary/40 hover:border-accent/50 min-h-[105px] focus:bg-bg-secondary/40 focus:border-accent/50 group transition-all hover:shadow-glow/50 hover:scale-[1.02] card-glow'
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
      <h3 className='text-base font-semibold md:text-lg text-dark-1 group-hover:text-accent group-focus:text-accent transition-colors'>
        {title}
      </h3>
      <div className='flex flex-wrap gap-2 mt-2'>{children}</div>
    </a>
  );
};

export default Issue;
