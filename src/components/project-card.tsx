import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 transform hover:-translate-y-2">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-2xl font-bold text-white mb-2">{project.title}</CardTitle>
        <CardDescription className="text-slate-300 mb-4 h-20 overflow-hidden">{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-none">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
        {project.liveUrl && (
          <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Site
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild size="sm" variant="ghost">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        )}
        </div>
        <div className="group-hover:opacity-0 transition-opacity duration-300 text-sm text-muted-foreground">View Project</div>
      </CardFooter>
    </Card>
  );
};
