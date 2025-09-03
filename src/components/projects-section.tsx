
'use client';

import type { FC } from 'react';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/use-projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AnimatedServices, AnimatedText } from './animated-services';

export const ProjectsSection: FC = () => {
  const { projects, loading } = useProjects();

  return (
    <div className="max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {loading
            ? [...Array(3)].map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col gap-4 p-6 aspect-square items-center justify-center">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div id="work-with-me" className="mt-16 flex items-center justify-between">
        <AnimatedText text="Full-Stack Expertise" className="text-center" />
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-primary-foreground text-lg font-bold py-8 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <a href="https://www.linkedin.com/in/akin-solomon-85033121a" target="_blank" rel="noopener noreferrer">
            WORK WITH ME
            <ArrowRight className="ml-2 h-6 w-6" />
          </a>
        </Button>
         <AnimatedText text="Modern Web Solutions" className="text-center" />
      </div>
    </div>
  );
};
