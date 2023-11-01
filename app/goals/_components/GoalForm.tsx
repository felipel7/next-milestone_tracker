'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { goalSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Goal } from '@prisma/client';
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

type GoalFormData = z.infer<typeof goalSchema>;

const GoalForm = ({ goal }: { goal?: Goal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<GoalFormData>({ resolver: zodResolver(goalSchema) });

  const onSubmit = handleSubmit(async data => {
    try {
      setIsSubmitting(true);

      if (goal) await axios.patch(`/api/goals/${goal.id}`, data);
      else await axios.post('/api/goals', data);

      router.push('/goals');
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error ocurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="ruby" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={goal?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          defaultValue={goal?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {goal ? 'Update Goal' : 'Submit new goal'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default GoalForm;
