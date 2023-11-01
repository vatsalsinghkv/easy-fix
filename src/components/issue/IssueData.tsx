import { convertToK, timeSince } from '@/lib/utils';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { FC } from 'react';
import { css } from 'styled-system/css';

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
  <div
    className={css({
      color: 'dark-2',
      display: 'flex',
      flexWrap: 'wrap',
      fontFamily: 'mono',
      fontSize: 'xs',
      gap: '1',
      justifyContent: 'space-between',
      lineHeight: 'xs',
      mb: '1',
      transition: 'all',
      _groupFocus: {
        color: 'dark-1',
      },
      _groupHover: {
        color: 'dark-1',
      },
    })}
  >
    <p
      aria-label='repository-name'
      className={css({
        display: 'flex',
        gap: '2.5',
        flexWrap: 'wrap',
        fontWeight: 'medium',
      })}
    >
      {fullName}
    </p>
    <div className={css({ display: 'flex', alignItems: 'center', gap: '2.5' })}>
      <span
        aria-label='comments-count'
        className={css({ display: 'flex', alignItems: 'center', gap: '0.5' })}
      >
        <Icon
          className={css({ mt: '0.5' })}
          icon='mdi:comment-outline'
          height={13}
          width={13}
        />
        {convertToK(comments)}
      </span>
      {stargazersCount && stargazersCount > 0 ? (
        <span
          aria-label='stargazers-count'
          className={css({ display: 'flex', alignItems: 'center', gap: '0.5' })}
        >
          <Icon icon='mdi:star-outline' height={16} width={16} />
          {convertToK(stargazersCount)}
        </span>
      ) : null}
      <span
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '1',
          wordSpacing: '-3.75px',
        })}
      >
        <Icon icon='mdi:clock-outline' height={14} width={14} />
        {timeSince(date)}
      </span>
    </div>
  </div>
);

export default IssueData;
