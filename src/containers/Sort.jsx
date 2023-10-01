import { MiniContainer, SortBy } from '../components';
import { useUrl } from '../hooks/use-url';
import { SORT_BY } from '../utils/config';
import { toId } from '../utils/helper';

const getSortKey = (displayKey) =>
  SORT_BY.find((sort) => sort.displayKey === displayKey).sortKey;

const Sort = () => {
  const { sortBy, setSortBy } = useUrl();

  const changeHandler = (e) => {
    setSortBy({
      sortKey: getSortKey(e.target.id),
      direction: sortBy.direction,
      displayKey: e.target.id,
    });
  };

  const getDirection = (direction) => (direction === 'asc' ? 'desc' : 'asc');

  const setDirection = (e) => {
    setSortBy({
      displayKey: e,
      sortKey: sortBy.sortKey,
      direction: getDirection(sortBy.direction),
    });
  };

  return (
    <MiniContainer title='Sort'>
      <form className='flex flex-wrap gap-3 mt-4' onChange={changeHandler}>
        {SORT_BY.map((sort) => (
          <SortBy
            value={sortBy.displayKey}
            key={toId(sort.displayKey)}
            name={sort.displayKey}
            setDirection={setDirection}
            direction={sortBy.direction}
          />
        ))}
      </form>
    </MiniContainer>
  );
};

export default Sort;
