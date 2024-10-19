const Switch = ({ toggle, onChange }) => {
  return (
    <label className='relative block w-10 h-5 rounded bg-slate-700'>
      <input
        checked={toggle}
        type='checkbox'
        onChange={onChange}
        name='toggle'
        className='z-10 opacity-0 peer'
      />
      <span className='absolute top-0 left-0 block w-5 h-5 transition-all bg-red-500 rounded-full peer-checked:bg-yellow-200 peer-checked:left-100 peer-checked:right-0 peer-checked:left-auto'></span>
    </label>
  );
};

export default Switch;
