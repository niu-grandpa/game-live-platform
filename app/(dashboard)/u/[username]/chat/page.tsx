import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';

import { ToggleCard } from './_components/toggle-card';

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('未找到该直播');
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>聊天设置</h1>
      </div>
      <div className='space-y-4'>
        <ToggleCard
          field='isChatEnabled'
          label='启用聊天'
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field='isChatDelayed'
          label='消息延迟'
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field='isChatFollowersOnly'
          label='仅关注者能发言'
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
