import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

const createGoalSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(65535),
});

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
