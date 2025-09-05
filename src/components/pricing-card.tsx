
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: {
    title: string;
    priceNaira: string;
    priceUsd: string;
    description: string;
    features: string[];
    examples: string[];
    isFeatured?: boolean;
  };
}

export function PricingCard({ plan }: PricingCardProps) {
  const recipientEmail = 'opeakin2022@gmail.com';
  const subject = `Inquiry about the ${plan.title} Plan`;
  const body = `Hello Akinde,

I'm interested in your services and would like to discuss the ${plan.title} Plan.

Here are the details of the plan I'm interested in:
- Plan: ${plan.title}
- Price: ${plan.priceNaira} ${plan.priceUsd}

[Please add your project details or any questions you have here.]

Looking forward to hearing from you.

Best regards,
[Your Name]
`;

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <Card
      className={cn(
        "flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/20 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2",
        plan.isFeatured ? "border-primary shadow-lg shadow-primary/20" : "hover:border-accent hover:shadow-accent/10"
      )}
    >
      <CardHeader className="p-6">
        <CardTitle className={cn("text-2xl font-bold mb-2", plan.isFeatured ? "text-gradient" : "text-foreground")}>{plan.title}</CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-foreground">{plan.priceNaira}</span>
          <span className="text-xl font-medium text-muted-foreground">{plan.priceUsd}</span>
        </div>
        <CardDescription className="pt-2">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Features:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Examples of sites that fit this plan:</h4>
          <ul className="space-y-2">
            {plan.examples.map((example, index) => (
              <li key={index} className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground text-sm">{example}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          asChild
          className={cn(
            "w-full text-lg font-bold", 
            plan.isFeatured ? "bg-primary hover:bg-primary/90" : "bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:opacity-90"
          )}
        >
          <a href={mailtoLink}>Choose Plan</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
