import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('用户暂无权限');
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('用户暂无权限');
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  if (self.username !== user.username) {
    throw new Error('用户暂无权限');
  }

  return user;
};
