export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/milestones/new', '/milestones/edit/:id+'],
};
