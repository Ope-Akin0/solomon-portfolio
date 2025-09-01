
'use client';

import type { FC } from 'react';
import { Card } from '@/components/ui/card';
import { ProjectsSection } from '@/components/projects-section';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, User, Code, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const AboutSection: FC = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 bg-card flex items-center">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1 flex justify-center">
          <Image
            src="/images/site.jpg"
            alt="Profile picture"
            data-ai-hint="professional portrait"
            width={300}
            height={300}
            className="rounded-full border-4 border-primary object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground mb-4">
            I'm a passionate web designer and developer with a love for creating fluid, intuitive, and dynamic user experiences. My expertise lies in turning complex problems into beautiful, interactive designs.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
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
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-8">
          I'm currently available for freelance work. If you have a project in mind or just want to say hi, feel free to reach out.
        </p>
        <div className="flex justify-center items-center gap-6">
           <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="mailto:opeakin2022@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="h-12 w-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <a href="https://www.linkedin.com/in/akin-solomon-85033121a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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

const ProjectsSectionWithHeader = () => {
    const { user } = useAuth();
    const isAuth = !!user;

    const AddProjectButton = () => (
      <Button
        asChild={isAuth}
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!isAuth}
        aria-label="Add project"
      >
        {isAuth ? (
          <Link href="/admin">
            <PlusCircle className="h-6 w-6" />
          </Link>
        ) : (
          <PlusCircle className="h-6 w-6" />
        )}
      </Button>
    );


    return (
        <section id="projects" className="min-h-screen py-20 px-4 md:px-8">
            <div className="relative max-w-7xl mx-auto">
                <div className="flex justify-center items-center gap-4 mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">Projects</h2>
                  <AddProjectButton />
                </div>
                <ProjectsSection />
            </div>
        </section>
    );
};


export const Sections = () => {
  return (
    <div className="relative z-0">
      <ProjectsSectionWithHeader />
      <AboutSection />
      <ContactSection />
    </div>
  );
};
