'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div className="logo">ME</div>
        <div>
          <h2 style={{ margin: 0 }}>Me — Playground</h2>
          <div className="text-muted">Profile & projects</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`link-badge ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
