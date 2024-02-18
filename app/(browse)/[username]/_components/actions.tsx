'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onUnblock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(data => toast.success(`您已关注 ${data.following.username}`))
        .catch(() => toast.error('出错了'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(data => toast.success(`已取消 ${data.following.username} 的关注`))
        .catch(() => toast.error('出错了'));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(data => toast.success(`已将 ${data.blocked.username} 移出黑名单`))
        .catch(() => toast.error('出错了'));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant='primary'>
        {isFollowing ? '取消关注' : '关注'}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        加入黑名单
      </Button>
    </>
  );
};
