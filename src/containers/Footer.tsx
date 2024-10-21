const Footer = () => {
  return (
    <footer className='p-5 font-mono text-xs text-center border-t md:p-8 text-dark-2 border-dark-3'>
      <a
        href='https://github.com/vatsalsinghkv/easy-fix'
        target='_blank'
        rel='noreferrer'
        className='transition focus:text-accent hover:text-accent'
      >
        Design &amp; Built by Vatsal Singh
      </a>
      <div className="social-media flex justify-center space-x-4 mt-2">
        <a href="https://twitter.com/vatsalsinghkv" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://github.com/vatsalsinghkv" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/vatsalsinghkv" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://www.facebook.com/vatsalsinghkv" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

