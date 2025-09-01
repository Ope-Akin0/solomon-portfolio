import type { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  createdAt?: Timestamp;
}
