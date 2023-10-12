import useFetch from '@/lib/hooks/use-fetch';
import { PropsWithChildren } from 'react';

import IssueData from './IssueData';

type Props = {
  title: string;
  url: string;
  repoUrl: string;
  date: string;
};

export const Issue = ({
  children,
  date,
  title,
  repoUrl,
  url,
}: PropsWithChildren<Props>) => {
  // TODO: any type is wrong, this needs to change once the useFetch is re-implemented
  const { data } = useFetch<any>(repoUrl);

  return (
    <a
      className='block p-5 border rounded-md border-dark-3 hover:bg-bg-secondary min-h-[105px] focus:bg-bg-secondary group'
      href={url}
      target='_blank'
      rel='noreferrer'
    >
      <IssueData
        date={date}
        fullName={data?.full_name}
        stargazersCount={data?.stargazers_count}
      />
      <h3 className='text-base font-medium md:text-lg text-dark-1 group-hover:text-accent group-focus:text-accent'>
        {title}
      </h3>
      <div className='flex flex-wrap'>{children}</div>
    </a>
  );
};

export default Issue;
