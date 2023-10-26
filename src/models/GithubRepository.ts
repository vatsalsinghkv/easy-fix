import z from 'zod';

export const githubRepositoryItem = z.object({
  id: z.number(),
  full_name: z.string(),
  node_id: z.string(),
  stargazers_count: z.number(),
});

export type GithubRepositoryItem = z.infer<typeof githubRepositoryItem>;
