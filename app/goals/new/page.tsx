'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createGoalSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type GoalForm = z.infer<typeof createGoalSchema>;

const NewGoalPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<GoalForm>({ resolver: zodResolver(createGoalSchema) });

  const submitForm = async (data: GoalForm) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/goals', data);
      router.push('/goals');
    } catch (error) {
      setIsSubmitting(false);
      setError('Something went wrong...');
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="ruby" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(submitForm)}>
        <TextField.Root>
          <TextField.Input {...register('title')} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit new goal {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewGoalPage;
