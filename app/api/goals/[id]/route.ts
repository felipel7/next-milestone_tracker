import { createGoalSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = createGoalSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal)
    return NextResponse.json({ error: 'Invalid goal' }, { status: 404 });

  const updatedGoal = await prisma.goal.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedGoal);
}
