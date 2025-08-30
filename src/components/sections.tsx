import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/use-projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, Send, User, Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const ProjectsSection: FC = () => {
  const { projects, loading } = useProjects();

  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">Projects</h2>
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-40 w-full" />
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AboutSection: FC = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 bg-card flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1 flex justify-center">
          <Image
            src="https://picsum.photos/400/400"
            alt="Profile picture"
            data-ai-hint="professional portrait"
            width={300}
            height={300}
            className="rounded-full border-4 border-primary object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
          <p className="text-lg text-slate-300 mb-4">
            I'm a passionate web designer and developer with a love for creating fluid, intuitive, and dynamic user experiences. My expertise lies in turning complex problems into beautiful, interactive designs.
          </p>
          <p className="text-lg text-slate-300 mb-8">
            With a strong foundation in modern frontend technologies, I enjoy bringing ideas to life in the browser.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-accent">
              <User />
              <span>Web Designer</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Code />
              <span>Frontend Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection: FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-lg text-slate-300 mb-8">
          I'm currently available for freelance work. If you have a project in mind or just want to say hi, feel free to reach out.
        </p>
        <div className="flex justify-center items-center gap-6">
           <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="mailto:hello@orbitalfolio.com">
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="h-12 w-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </Button>
           <Button asChild variant="outline" size="icon" className="h-12 w-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};


export const Sections = () => {
  return (
    <div className="relative z-0">
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};
