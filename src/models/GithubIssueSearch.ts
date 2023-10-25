import z from 'zod';

const githubIssueLabel = z.object({
  color: z.string(),
  id: z.number(),
  name: z.string(),
  node_id: z.string(),
  url: z.string(),
});

export type GithubIssueLabel = z.infer<typeof githubIssueLabel>;

const githubIssueItem = z.object({
  comments: z.number(),
  created_at: z.string().datetime(),
  html_url: z.string().url(),
  labels: z.array(githubIssueLabel),
  repository_url: z.string().url(),
  title: z.string(),
});

export type GithubIssueItem = z.infer<typeof githubIssueItem>;

export const githubIssueSearchResponse = z.object({
  incomplete_results: z.boolean(),
  items: z.array(githubIssueItem),
  total_count: z.number(),
});

export type GithubIssueSearchResponse = z.infer<
  typeof githubIssueSearchResponse
>;
