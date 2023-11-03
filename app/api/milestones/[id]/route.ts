import { patchMileStoneSchema } from '@/app/validationSchema';
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
  const validation = patchMileStoneSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description, status } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid user' }, { status: 404 });
  }

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
      title,
      description,
      assignedToUserId,
      status,
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
