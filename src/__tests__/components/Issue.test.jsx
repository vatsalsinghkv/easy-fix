import { render, screen } from '@testing-library/react';

import Issue from '@/components/Issue.jsx';
import * as useFetchHook from '@/lib/hooks/use-fetch';

describe('Issue', () => {
  const mockIssue = {
    title: 'Test Issue',
    url: 'https://github.com/test/test-issue',
    labels: [{ name: 'test-label' }],
    repoUrl: 'https://api.github.com/repos/test/test',
    date: '2023-01-01T00:00:00Z',
  };

  const useFetchSpy = vi.spyOn(useFetchHook, 'default');
  const mockResolveValue = {
    ok: true,
    status: 200,
    data: { full_name: 'test/test', stargazers_count: 100 },
  };

  it('renders the issue title', () => {
    render(<Issue {...mockIssue} />);

    const issueTitle = screen.getByText(/Test Issue/i);
    expect(issueTitle).toBeInTheDocument();
  });

  it('renders the issue link correctly', () => {
    render(<Issue {...mockIssue} />);

    const issueLink = screen.getByRole('link', { name: /Test Issue/i });
    expect(issueLink).toBeInTheDocument();
    expect(issueLink).toHaveAttribute('href', mockIssue.url);
  });

  it('renders the issue labels', () => {
    render(<Issue {...mockIssue} />);

    const labelElement = screen.getByText(/test-label/i);
    expect(labelElement).toBeInTheDocument();
  });

  // Note: add test for repo name and stars count

  it('renders the repository name', () => {
    useFetchSpy.mockReturnValue(mockResolveValue);

    render(<Issue {...mockIssue} />);

    const repoName = screen.getByText(/test\/test/i);
    expect(repoName).toBeInTheDocument();
  });

  it('renders the stars count', () => {
    useFetchSpy.mockReturnValue(mockResolveValue);
    render(<Issue {...mockIssue} />);

    const starsCount = screen.getByText(/100/i);
    expect(starsCount).toBeInTheDocument();
  });
});
