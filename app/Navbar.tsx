'use client';

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoGoal } from 'react-icons/go';
import { Skeleton } from './components';

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <GoGoal size={20} style={{ color: 'var(--accent-9)' }} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            fallback="?"
            src={session!.user!.image!}
            radius="full"
            size="2"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Milestones', href: '/milestones/list' },
  ];

  return (
    <menu className="flex space-x-6">
      {links.map(link => (
        <li
          key={link.label}
          className={classNames({
            'nav-link': true,
            '!text-zinc-900': link.href === pathname,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </menu>
  );
};

export default Navbar;
