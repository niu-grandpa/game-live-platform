'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export const ToggleCard = ({
  label,
  value = false,
  field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('设置成功'))
        .catch(() => toast.error('出错了'));
    });
  };

  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold shrink-0'>{label}</p>
        <div className='space-y-2'>
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}>
            {value ? '开启' : '关闭'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className='rounded-xl p-10 w-full' />;
};
