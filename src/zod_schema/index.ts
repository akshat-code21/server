import { ProjectType } from '@prisma/client';
import { z } from 'zod';

export const addContributorProfileSchema = z.object({
  occupation: z.string(),
  experience: z.number(),
  aadhar: z.string(),
  pan: z.string(),
  github: z.string(),
  linkedin: z.string(),
  contributionDuration: z.number(),
});

export const createProposalSchema = z.object({
  details: z.string(),
  resources: z.string(),
  impact: z.string(),
  projectId: z.string(),
});

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(ProjectType),
});
