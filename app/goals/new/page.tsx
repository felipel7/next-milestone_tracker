'use client';

import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';

const NewGoalPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>

      <SimpleMDE placeholder="Description..." />

      <Button>Submit</Button>
    </div>
  );
};

export default NewGoalPage;
