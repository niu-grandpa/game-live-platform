import { User } from '@prisma/client';
import Link from 'next/link';

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className='h-full w-full space-y-4 shadow-lg'>
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className='flex gap-x-3 pl-[12px] pb-[12px]'>
          <UserAvatar
            showBadge
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className='flex flex-col text-sm overflow-hidden'>
            <p className='truncate font-semibold text-black'>
              {data.name.replace("'s stream", ' 的直播间')}
            </p>
            <p className='text-muted-foreground'>{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className='h-full w-full space-y-4'>
      <ThumbnailSkeleton />
      <div className='flex gap-x-3'>
        <UserAvatarSkeleton />
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </div>
  );
};
