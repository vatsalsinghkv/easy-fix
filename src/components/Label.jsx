const Label = ({ children, className }) => {
  return (
    <div
      className={`flex items-center  font-mono px-3 py-1.5 text-xs font-medium capitalize rounded-full text-accent bg-accent-light ${className}`}
    >
      {children}
    </div>
  );
};

export default Label;
