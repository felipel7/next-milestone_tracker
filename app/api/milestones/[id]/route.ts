import { mileStoneSchema } from '@/app/validationSchema';
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
  const validation = mileStoneSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const milestone = await prisma.milestone.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!milestone)
    return NextResponse.json({ error: 'Invalid milestone' }, { status: 404 });

  const updatedMilestone = await prisma.milestone.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedMilestone);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const milestone = await prisma.milestone.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!milestone)
    return NextResponse.json({ error: 'Invalid milestone' }, { status: 404 });

  await prisma.milestone.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
