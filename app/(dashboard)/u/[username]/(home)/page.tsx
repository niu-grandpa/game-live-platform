import { currentUser } from '@clerk/nextjs';

import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error('用户暂无权限');
  }

  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
