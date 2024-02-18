'use client';

import { User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import { UserItem, UserItemSkeleton } from './user-item';

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

// 这个函数使用了Fisher-Yates洗牌算法，通过遍历数组元素，
// 并与一个随机选中的之前的元素交换位置，以达到随机化数组的目的。
// 这种方法既高效又公正，确保每个元素在数组中的每个位置的概率是相等的。
const shuffleArray = (arr: RecommendedProps['data']) => {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate random index
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar(state => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>您可能感兴趣的</p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {shuffleArray(data).map(user => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className='px-2'>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
