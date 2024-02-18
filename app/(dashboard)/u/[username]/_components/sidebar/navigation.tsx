'use client';

import { useUser } from '@clerk/nextjs';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavItem, NavItemSkeleton } from './nav-item';

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: '直播间',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: '服务器配置',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: '聊天设置',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: '观看用户',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className='space-y-2'>
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
      {routes.map(route => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
