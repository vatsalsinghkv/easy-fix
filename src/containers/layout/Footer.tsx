const Footer = () => {
  return (
    <footer className='relative p-8 md:p-12 font-mono text-sm text-center border-t border-dark-3 bg-gradient-to-br from-bg-secondary/50 to-bg/50 backdrop-blur-sm'>
      <div className='max-w-4xl mx-auto'>
        <a
          href='https://github.com/vatsalsinghkv/easy-fix'
          target='_blank'
          rel='noreferrer'
          className='inline-block text-lg font-semibold transition-all hover:text-accent focus:text-accent hover:scale-105'
        >
          Design &amp; Built by{' '}
          <span className='gradient-text font-bold'>Vatsal Singh</span>
        </a>
        <div className='social-media flex justify-center space-x-6 mt-6'>
          <a
            href='https://twitter.com/vatsalsinghkv'
            target='_blank'
            rel='noreferrer'
            className='text-dark-2 hover:text-accent transition-all hover:scale-110 hover:drop-shadow-glow'
            aria-label='Twitter'
          >
            <i className='fab fa-twitter text-3xl'></i>
          </a>
          <a
            href='https://github.com/vatsalsinghkv'
            target='_blank'
            rel='noreferrer'
            className='text-dark-2 hover:text-accent transition-all hover:scale-110 hover:drop-shadow-glow'
            aria-label='GitHub'
          >
            <i className='fab fa-github text-3xl'></i>
          </a>
          <a
            href='https://www.linkedin.com/in/vatsalsinghkv'
            target='_blank'
            rel='noreferrer'
            className='text-dark-2 hover:text-accent transition-all hover:scale-110 hover:drop-shadow-glow'
            aria-label='LinkedIn'
          >
            <i className='fab fa-linkedin text-3xl'></i>
          </a>
          <a
            href='https://www.facebook.com/vatsalsinghkv'
            target='_blank'
            rel='noreferrer'
            className='text-dark-2 hover:text-accent transition-all hover:scale-110 hover:drop-shadow-glow'
            aria-label='Facebook'
          >
            <i className='fab fa-facebook text-3xl'></i>
          </a>
        </div>
        <div className='mt-6 text-dark-2 text-xs'>
          <p>Powered by open source ❤️</p>
        </div>
      </div>
      {/* Decorative gradient blur */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-accent opacity-30'></div>
    </footer>
  );
};

export default Footer;
