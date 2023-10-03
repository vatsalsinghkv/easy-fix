import { Icon } from '@iconify-icon/react';

import useFetch from '@/hooks/use-fetch';
import { convertToK, timeSince } from '@/utils/helper';
import Label from '@/components/Label';

const Issue = ({ title, url, labels, repoUrl, date }) => {
  const { data } = useFetch(repoUrl);

  return (
    <a
      className='block p-5 border rounded-md border-dark-3 hover:bg-bg-secondary min-h-[105px] focus:bg-bg-secondary group'
      href={url}
      target='_blank'
      rel='noreferrer'
    >
      <div className='flex flex-wrap justify-between gap-1 mb-1 font-mono text-xs transition-all text-slate-400 group-hover:text-dark-1 group-focus:text-dark-1'>
        {data && (
          <p className='flex gap-2.5 flex-wrap font-medium'>{data.full_name}</p>
        )}

        <div className='flex items-center gap-2.5'>
          {data?.stargazers_count > 0 && (
            <span className='flex items-center gap-0.5'>
              <Icon icon='mdi:star-outline' height={16} width={16} />
              {convertToK(data.stargazers_count)}
            </span>
          )}
          <span className='flex items-center gap-1 [word-spacing:-3.75px]'>
            <Icon icon='mdi:clock-outline' height={14} width={14} />
            {timeSince(date)}
          </span>
        </div>
      </div>
      <h3 className='text-base font-medium md:text-lg text-dark-1 group-hover:text-accent group-focus:text-accent'>
        {title}
      </h3>
      <div className='flex flex-wrap'>
        {labels.map((label) => (
          <Label key={label.name.replaceAll(' ', '')} className='mr-1.5 mt-2'>
            {label.name}
          </Label>
        ))}
      </div>
    </a>
  );
};

export default Issue;
