import { createGoalSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createGoalSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const goal = await prisma.goal.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(goal, { status: 201 });
}
