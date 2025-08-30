'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Spinner } from '@/components/ui/spinner';
import { PlusCircle } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  tags: z.string().min(1, 'Please add at least one tag.'),
  liveUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.type.startsWith('image/'), 'Must be an image file.')
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, 'Image size must be less than 5MB.'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function AddProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      liveUrl: '',
      githubUrl: '',
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    const imageFile = data.image[0];
    const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Upload failed', error);
        toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
        setIsSubmitting(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await addDoc(collection(db, 'projects'), {
              title: data.title,
              description: data.description,
              tags: data.tags.split(',').map((tag) => tag.trim()),
              liveUrl: data.liveUrl,
              githubUrl: data.githubUrl,
              imageUrl: downloadURL,
              createdAt: serverTimestamp(),
            });
            toast({ title: 'Project Added', description: 'Your new project has been added successfully.' });
            form.reset();
          } catch (error: any) {
            console.error('Firestore error', error);
            toast({ title: 'Submission Failed', description: error.message, variant: 'destructive' });
          } finally {
            setIsSubmitting(false);
          }
        });
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>Fill out the details below to add a new project to your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cool App" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief description of your project." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="React, Next.js, Tailwind CSS (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Spinner /> : <><PlusCircle className="mr-2 h-4 w-4" /> Add Project</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
