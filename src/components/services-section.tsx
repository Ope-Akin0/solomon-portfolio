import { Code, Smartphone, Blocks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: <Blocks className="h-10 w-10 text-primary" />,
    title: 'Software Composing',
    description: 'Crafting unique, full-stack solutions by composing modern technologies and services.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Full-Stack Applications',
    description: 'Building robust and scalable web applications from front-end to back-end.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Responsive Web Design',
    description: 'Creating beautiful, intuitive websites that look and work perfectly on any device.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What I Do</h2>
          <p className="text-lg text-muted-foreground">I specialize in creating modern digital experiences.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-card/50 backdrop-blur-sm border-border/20 text-center p-6 flex flex-col items-center transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transform hover:-translate-y-2"
            >
              <CardHeader className="p-0 mb-4">
                {service.icon}
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">{service.title}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
