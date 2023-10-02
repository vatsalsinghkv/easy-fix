import { MiniContainer, SortBy } from '../components';

import { SORT_BY } from '../utils/config';
import { toId } from '../utils/helper';
import { useUrl } from '../hooks/use-url';

const getSortKey = (displayKey) =>
  SORT_BY.find((sort) => sort.displayKey === displayKey).sortKey;

const Sort = () => {
  const { sortBy, setSortBy } = useUrl();

  const onSortChange = (e) => {
    setSortBy({
      displayKey: e,
      sortKey: getSortKey(e),
      order: sortBy.order,
    });
  };

  const getOrder = (order) => (order === 'asc' ? 'desc' : 'asc');

  const setOrder = (e) => {
    setSortBy({
      displayKey: e,
      sortKey: sortBy.sortKey,
      order: getOrder(sortBy.order),
    });
  };

  return (
    <MiniContainer title='Sort'>
      <form className='flex flex-wrap gap-3 mt-4'>
        {SORT_BY.map((sort) => (
          <SortBy
            value={sortBy.displayKey}
            key={toId(sort.displayKey)}
            name={sort.displayKey}
            setOrder={setOrder}
            order={getOrder(sortBy.order)}
            onSortChange={onSortChange}
          />
        ))}
      </form>
    </MiniContainer>
  );
};

export default Sort;
