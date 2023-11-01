import { goalSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validation = goalSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const goal = await prisma.goal.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(goal, { status: 201 });
}
