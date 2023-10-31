'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiTargetShot } from 'react-icons/gi';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Goals', href: '/goals' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 p-5 border-b">
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
    </nav>
  );
};

export default Navbar;
