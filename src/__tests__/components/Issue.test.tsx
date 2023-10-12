import Issue from '@/components/issue';
import IssueData from '@/components/issue/IssueData';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';

type IssueProps = ComponentProps<typeof Issue>;
type IssueDataProps = ComponentProps<typeof IssueData>;

const issueProps: IssueProps = {
  title: 'Test Issue',
  url: 'https://github.com/test/test-issue',
  repoUrl: 'https://api.github.com/repos/test/test',
  date: '2023-01-01T00:00:00Z',
};

const issueDataProps: IssueDataProps = {
  date: '2023-01-01T00:00:00Z',
  fullName: 'test-full-name',
  stargazersCount: 100,
};

const mockLabels = [{ name: 'test-label-1' }, { name: 'test-label-2' }];

const renderIssue = (props: IssueProps = issueProps) => {
  return render(<Issue {...props} />);
};

const renderIssueData = (props: IssueDataProps = issueDataProps) => {
  return render(<IssueData {...props} />);
};

describe('Issue should', () => {
  it('renders the issue title correctly', () => {
    const screen = renderIssue();

    const issueTitle = screen.getByText(/Test Issue/i);
    expect(issueTitle).toBeInTheDocument();
  });

  it('renders the issue link correctly', () => {
    const screen = renderIssue();

    const issueLink = screen.getByRole('link', { name: /Test Issue/i });
    expect(issueLink).toBeInTheDocument();
    expect(issueLink).toHaveAttribute('href', issueProps.url);
  });

  it('renders children correctly', () => {
    const children = (
      <ul>
        {mockLabels.map((label) => (
          <li key={label.name}>{label.name}</li>
        ))}
      </ul>
    );
    const screen = renderIssue({ ...issueProps, children });

    mockLabels.forEach((label) => {
      const labelElement = screen.getByText(label.name);
      expect(labelElement).toBeInTheDocument();
    });
  });
});

describe('IssueData', () => {
  it('should render the repository name if present', () => {
    const screen = renderIssueData({
      ...issueDataProps,
      fullName: 'super repo',
    });

    const repoName = screen.queryByLabelText(/repository-name/i);
    expect(repoName).toBeInTheDocument();
    expect(repoName?.textContent).toBe('super repo');
  });

  it('should NOT render the repository name if missing', () => {
    const screen = renderIssueData({ ...issueDataProps, fullName: undefined });

    const repoName = screen.queryByLabelText(/repository-name/i);
    expect(repoName).toBeInTheDocument();
    expect(repoName?.textContent).to.be.empty;
  });

  it('should render the star count if present and greater than 0', () => {
    const screen = renderIssueData({ ...issueDataProps, stargazersCount: 125 });

    const starsCount = screen.queryByLabelText(/stargazers-count/i);
    expect(starsCount).toBeInTheDocument();
    expect(starsCount?.textContent).toBe('125');
  });

  it('should NOT render the star count if present but NOT greater than 0', () => {
    const screen = renderIssueData({ ...issueDataProps, stargazersCount: 0 });

    const starsCount = screen.queryByLabelText(/stargazers-count/i);
    expect(starsCount).not.toBeInTheDocument();
  });

  it('should NOT render the star count if missing', () => {
    const screen = renderIssueData({
      ...issueDataProps,
      stargazersCount: undefined,
    });

    const starsCount = screen.queryByLabelText(/stargazers-count/i);
    expect(starsCount).not.toBeInTheDocument();
  });
});
