'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { LiveKitRoom } from '@livekit/components-react';
import EasyDanmaku from 'easy-danmaku-js';

import { useRef } from 'react';
import { AboutCard } from './about-card';
import { Chat, ChatSkeleton } from './chat';
import { ChatToggle } from './chat-toggle';
import { Header, HeaderSkeleton } from './header';
import { InfoCard } from './info-card';
import { Video, VideoSkeleton } from './video';

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar(state => state);
  const danmaku = useRef<EasyDanmaku>();

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  const handleConnected = () => {
    try {
      danmaku.current = new EasyDanmaku({
        el: '#container',
        colourful: true,
        line: 30,
        wrapperStyle: 'danmaku-wrapper',
        speed: 7,
        runtime: 10,
        hover: true,
        onComplete: () => {
          console.log('弹幕播放结束');
        },
      });
    } catch (e) {}
  };

  const handleSend = (val: string) => {
    try {
      danmaku.current?.send(val);
    } catch {}
  };

  return (
    <>
      {collapsed && (
        <div className='hidden lg:block fixed top-[100px] right-2 z-50'>
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        onConnected={handleConnected}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full bg-[#f2f4f8]',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}>
        <div className='space-y-4 bg-white col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
          <div id='container'>
            <Video hostName={user.username} hostIdentity={user.id} />
          </div>
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            onMessage={handleSend}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>
      <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className='col-span-1 bg-background'>
        <ChatSkeleton />
      </div>
    </div>
  );
};
