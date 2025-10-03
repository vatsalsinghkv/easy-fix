import { convertToK, timeSince } from '@/lib/utils';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { FC } from 'react';

type Props = {
  date: number | string;
  fullName?: string;
  stargazersCount?: number;
  comments: number;
};

export const IssueData: FC<Props> = ({
  date,
  fullName,
  stargazersCount,
  comments,
}) => (
  <div className='flex flex-wrap justify-between gap-1 mb-1 font-mono text-xs transition-all text-dark-2 group-hover:text-dark-1 group-focus:text-dark-1'>
    <p
      aria-label='repository-name'
      className='flex gap-2.5 flex-wrap font-medium'
    >
      {fullName}
    </p>
    <div className='flex items-center gap-2.5'>
      <span aria-label='comments-count' className='flex items-center gap-0.5'>
        <Icon
          className='mt-0.5'
          icon='mdi:comment-outline'
          height={13}
          width={13}
        />
        {convertToK(comments)}
      </span>
      {stargazersCount && stargazersCount > 0 ? (
        <span
          aria-label='stargazers-count'
          className='flex items-center gap-0.5'
        >
          <Icon icon='mdi:star-outline' height={16} width={16} />
          {convertToK(stargazersCount)}
        </span>
      ) : null}
      <span className='flex items-center gap-1 [word-spacing:-3.75px]'>
        <Icon icon='mdi:clock-outline' height={14} width={14} />
        {timeSince(date)}
      </span>
    </div>
  </div>
);

export default IssueData;
