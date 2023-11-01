'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
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
              <Link href="/api/auth/signout">Logout</Link>
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
