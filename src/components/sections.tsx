
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
          <div className="space-y-4 text-lg text-muted-foreground">
             <p>
              My name is Akinde Solomon O., and I am a web developer with a passion for turning complex problems into beautiful and intuitive digital experiences. Though I graduated with a degree in Biochemistry in Nigeria, my fascination with technology and the endless possibilities of the web led me on a journey into tech.
            </p>
            <p>
              I quickly fell in love with the creative process of web design and have been honing my skills ever since. The journey has had its challenges, but I continue to push forward, driven by my passion to create and innovate. My core skills include <span className="text-primary font-semibold">HTML</span>, <span className="text-primary font-semibold">CSS</span>, <span className="text-primary font-semibold">Bootstrap</span>, and <span className="text-primary font-semibold">JavaScript</span>. Recently, I've embraced <span className="text-primary font-semibold">software composing</span>, which has taken my creativity to another level, allowing me to flawlessly build full-stack applications like the ones you see in my projects.
            </p>
            <p>
              I am eager to collaborate, gather new experiences, and contribute to impactful projects. I hope to work with many of you. Please feel free to contact me via email or on LinkedIn.
            </p>
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

    return (
        <section id="projects" className="min-h-screen py-20 px-4 md:px-8">
            <div className="relative max-w-7xl mx-auto">
                <div id="projects-button" className="flex justify-center items-center gap-4 mb-12">
                  <Button variant="link" className="text-4xl md:text-5xl font-bold text-center text-foreground hover:no-underline">Projects</Button>
                    <Button
                      asChild={isAuth}
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground rounded-full border-2 border-transparent hover:border-accent hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!isAuth}
                      aria-label="Add project"
                    >
                      {isAuth ? (
                        <Link href="/admin">
                          <PlusCircle className="h-6 w-6" />
                        </Link>
                      ) : (
                        <div>
                           <PlusCircle className="h-6 w-6" />
                        </div>
                      )}
                    </Button>
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
