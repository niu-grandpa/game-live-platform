'use client';

import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { updateUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || '');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('个性签名已更新');
          closeRef.current?.click();
        })
        .catch(() => toast.error('出错了'));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' size='sm' className='ml-auto'>
          编辑
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑个性签名</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Textarea
            placeholder='User bio'
            onChange={e => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className='resize-none'
          />
          <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type='button' variant='ghost'>
                取消
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit' variant='primary'>
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
