import { MiniContainer, Select, SortBy } from '@/components';
import { Language, sortedLanguages } from '@/models/Language';
import { Tag, sortedTags } from '@/models/Tag';
import { useUrlValues } from '@/providers/urlProvider';

const Filter = () => {
  const { dispatch, language, ordering, tag } = useUrlValues();

  const onLanguageChange = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const onOrderingChange = () => dispatch({ type: 'update-ordering' });

  const onTagChange = (payload: Tag) => {
    return () => dispatch({ type: 'update-tag', payload });
  };

  return (
    <>
      <MiniContainer title='languages'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {sortedLanguages.map((lang) => (
            <Select
              checked={lang === language}
              key={lang}
              name={lang}
              onChange={onLanguageChange(lang)}
              value={lang}
            />
          ))}
        </form>
      </MiniContainer>

      <MiniContainer title='sort'>
        <form className='flex flex-wrap gap-3 mt-4'>
          {sortedTags.sort().map((sTag) => (
            <SortBy
              key={sTag}
              name={sTag}
              onOrderingChange={onOrderingChange}
              onTagChange={onTagChange(sTag)}
              value={sTag}
            />
          ))}
        </form>
      </MiniContainer>
    </>
  );
};

export default Filter;
