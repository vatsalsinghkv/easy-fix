import z from 'zod';

const githubIssuePullRequest = z.object({
  diff_url: z.string().url(),
  html_url: z.string().url(),
  patch_url: z.string().url(),
  url: z.string().url(),
});

export type GithubIssuePullRequest = z.infer<typeof githubIssuePullRequest>;

const githubIssueLabel = z.object({
  color: z.string(),
  id: z.number(),
  name: z.string(),
  node_id: z.string(),
  url: z.string(),
});

export type GithubIssueLabel = z.infer<typeof githubIssueLabel>;

const githubIssueAuthorAssociation = z.enum([
  'COLLABORATOR',
  'CONTRIBUTOR',
  'FIRST_TIMER',
  'FIRST_TIME_CONTRIBUTOR',
  'MANNEQUIN',
  'MEMBER',
  'NONE',
  'OWNER',
]);

export type GithubIssueAuthorAssociation = z.infer<
  typeof githubIssueAuthorAssociation
>;

const githubIssueItem = z.object({
  active_lock_reason: z.string().nullable(),
  author_association: githubIssueAuthorAssociation,
  body: z.string().nullable(),
  closed_at: z.string().datetime().nullable(),
  comments_url: z.string().url(),
  comments: z.number(),
  created_at: z.string().datetime(),
  events_url: z.string().url(),
  html_url: z.string().url(),
  id: z.number(),
  labels_url: z.string().url(),
  labels: z.array(githubIssueLabel),
  locked: z.boolean(),
  node_id: z.string(),
  number: z.number(),
  pull_request: githubIssuePullRequest.optional(),
  repository_url: z.string().url(),
  score: z.number(),
  state_reason: z.string().nullable(),
  state: z.string(),
  title: z.string(),
  updated_at: z.string().datetime(),
  url: z.string(),
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
