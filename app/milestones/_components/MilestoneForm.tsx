'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { mileStoneSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Milestone } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';

type MilestoneFormData = z.infer<typeof mileStoneSchema>;

const MilestoneForm = ({ milestone }: { milestone?: Milestone }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<MilestoneFormData>({ resolver: zodResolver(mileStoneSchema) });

  const onSubmit = handleSubmit(async data => {
    try {
      setIsSubmitting(true);
      if (milestone) await axios.patch(`/api/milestones/${milestone.id}`, data);
      else await axios.post('/api/milestones', data);
      router.push('/milestones/list');
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
            defaultValue={milestone?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          defaultValue={milestone?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {milestone ? 'Update Milestone' : 'Submit new milestone'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default MilestoneForm;
