import FilterProvider from '@/lib/hooks/use-filter';
import ThemeProvider from '@/lib/hooks/use-theme';
import UrlProvider from '@/lib/hooks/useUrlValues';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UrlProvider>
        <ThemeProvider>
          <FilterProvider>{children}</FilterProvider>
        </ThemeProvider>
      </UrlProvider>
    </>
  );
}
