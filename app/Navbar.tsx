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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiTargetShot } from 'react-icons/gi';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Goals', href: '/goals/list' },
];

const Navbar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiTargetShot className="text-blue-500 text-2xl" />
            </Link>
            <menu className="flex space-x-4">
              {links.map(link => (
                <li
                  key={link.label}
                  className={classNames({
                    'text-zinc-900': link.href === pathname,
                    'text-zinc-500': link.href !== pathname,
                    'hover:text-zinc-800 transition-colors': true,
                  })}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </menu>
          </Flex>
          <Box>
            {status === 'authenticated' ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    className="cursor-pointer"
                    fallback="?"
                    src={session.user!.image!}
                    radius="full"
                    size="2"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
