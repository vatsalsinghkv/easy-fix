import Label from './Label';

const Issue = ({ title, url, labels }) => {
  return (
    <a
      className='block p-5 border rounded-md border-dark-3 hover:bg-bg-secondary min-h-[105px] focus:bg-bg-secondary group'
      href={url}
      target='_blank'
      rel='noreferrer'
    >
      <h3 className='text-xl font-medium text-dark-2 group-hover:text-accent group-focus:text-accent'>
        {title}
      </h3>
      <div className='flex flex-wrap mt-2'>
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
