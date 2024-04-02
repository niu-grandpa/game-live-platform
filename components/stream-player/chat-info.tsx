import { Info } from 'lucide-react';
import { useMemo } from 'react';

import { Hint } from '@/components/hint';

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return '只有关注者才能聊天';
    }

    if (isDelayed && !isFollowersOnly) {
      return '消息延迟3秒';
    }

    if (isDelayed && isFollowersOnly) {
      return '只有关注者才能聊天并且消息延迟3秒';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return '仅限关注者';
    }

    if (isDelayed && !isFollowersOnly) {
      return '慢速模式';
    }

    if (isDelayed && isFollowersOnly) {
      return '仅限关注者并且慢速模式';
    }

    return '';
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
      <Hint label={hint}>
        <Info className='h-4 w-4' />
      </Hint>
      <p className='text-xs font-semibold'>{label}</p>
    </div>
  );
};
