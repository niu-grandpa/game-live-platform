'use server';

import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

import { getSelf } from '@/lib/auth-service';
import { isBlockedByUser } from '@/lib/block-service';
import { getUserById } from '@/lib/user-service';

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `游客#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error('用户不存在');
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error('已被加入黑名单');
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
