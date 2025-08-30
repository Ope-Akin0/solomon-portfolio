'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/lib/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
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
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { projects, loading };
}
