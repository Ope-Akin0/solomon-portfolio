'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/lib/types';

const dummyProjects: Project[] = [
  {
    id: 'dummy-1',
    title: 'Snapchat',
    description: 'A popular multimedia messaging app that allows users to share photos and videos that disappear after being viewed.',
    tags: ['Social Media', 'Mobile App', 'Messaging'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    liveUrl: 'https://www.snapchat.com',
  },
  {
    id: 'dummy-2',
    title: 'Instagram',
    description: 'A photo and video sharing social networking service where users can share their moments with friends and followers.',
    tags: ['Social Media', 'Photo Sharing', 'Community'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    liveUrl: 'https://www.instagram.com',
  },
  {
    id: 'dummy-3',
    title: 'Jumia',
    description: 'A leading African online marketplace for electronics, fashion, and other consumer goods, connecting sellers with consumers.',
    tags: ['E-commerce', 'Online Marketplace', 'Africa'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    liveUrl: 'https://www.jumia.com',
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
            createdAt: data.createdAt,
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
