import { Icon } from '@iconify-icon/react';

import { TOTAL_SIBLING_BUTTONS } from '../../utils/config';
import PaginationButton from './PaginationButton';

const Pagination = ({ totalPages, currentPage, onChange }) => {
  if (totalPages <= 1) return;

  return (
    <div className='flex items-center justify-center gap-3 py-3 mb-5'>
      {
        <PaginationButton
          siblings={TOTAL_SIBLING_BUTTONS}
          onChange={onChange}
          totalPages={totalPages}
          currentPage={currentPage}
          type='prev'
          num={<Icon height={24} width={24} icon='ic:sharp-chevron-left' />}
          disable={currentPage === 1}
        />
      }
      {[...Array(totalPages)].map((_, i) => (
        <PaginationButton
          siblings={TOTAL_SIBLING_BUTTONS}
          onChange={onChange}
          key={i + 1}
          num={i + 1}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      ))}
      {
        <PaginationButton
          siblings={TOTAL_SIBLING_BUTTONS}
          onChange={onChange}
          totalPages={totalPages}
          currentPage={currentPage}
          type='next'
          num={<Icon height={24} width={24} icon='ic:sharp-chevron-right' />}
          disable={currentPage === totalPages}
        />
      }
    </div>
  );
};

export default Pagination;
