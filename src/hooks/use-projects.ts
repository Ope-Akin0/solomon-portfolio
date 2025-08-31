'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/lib/types';

const dummyProjects: Project[] = [
  {
    id: 'dummy-1',
    title: 'Placeholder Project One',
    description: 'This is a great placeholder description for a project that is yet to be added. It showcases the potential of your portfolio.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    liveUrl: '/',
    githubUrl: '/',
  },
  {
    id: 'dummy-2',
    title: 'Placeholder Project Two',
    description: 'Describe your amazing work here. This card is waiting for details about your skills and creativity.',
    tags: ['React', 'Firebase', 'ShadCN UI'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    liveUrl: '/',
    githubUrl: '/',
  },
  {
    id: 'dummy-3',
    title: 'Placeholder Project Three',
    description: 'This is another placeholder. Soon, it will be filled with an exciting project that highlights your talent.',
    tags: ['Genkit', 'AI', 'Node.js'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    liveUrl: '/',
    githubUrl: '/',
  },
];


export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setProjects(dummyProjects);
          setLoading(false);
          return;
        }

        const projectsData: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          projectsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            tags: data.tags,
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            imageUrl: data.imageUrl,
          } as Project);
        });
        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects: ', error);
        // Fallback to dummy data on error
        setProjects(dummyProjects);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { projects, loading };
}
