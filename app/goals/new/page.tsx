'use client';

import { createGoalSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';

type GoalForm = z.infer<typeof createGoalSchema>;

const NewGoalPage = () => {
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
      await axios.post('/api/goals', data);
      router.push('/goals');
    } catch (error) {
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
        {errors.title && (
          <Text as="p" color="ruby">
            {errors.title.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="ruby">
            {errors.description.message}
          </Text>
        )}

        <Button>Submit new goal</Button>
      </form>
    </div>
  );
};

export default NewGoalPage;
