import { goalSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validation = goalSchema.safeParse(body);

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!goal)
    return NextResponse.json({ error: 'Invalid goal' }, { status: 404 });

  await prisma.goal.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
