'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadDropzone } from '@/lib/uploadthing';

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('删除成功');
          setThumbnailUrl('');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('发生未知错误'));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('修改成功');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('发生未知错误'));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
          <DialogTitle>编辑直播信息</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-14'>
          <div className='space-y-2'>
            <Label>名称</Label>
            <Input
              disabled={isPending}
              placeholder='直播名称'
              onChange={onChange}
              value={name}
            />
          </div>
          <div className='space-y-2'>
            <Label>封面预览</Label>
            {thumbnailUrl ? (
              <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                <div className='absolute top-2 right-2 z-[10]'>
                  <Hint label='移除该图片' asChild side='left'>
                    <Button
                      type='button'
                      disabled={isPending}
                      onClick={onRemove}
                      className='h-auto w-auto p-1.5'>
                      <Trash className='h-4 w-4' />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt='Thumbnail'
                  src={thumbnailUrl}
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  appearance={{
                    label: {
                      color: '#FFFFFF',
                    },
                    allowedContent: {
                      color: '#FFFFFF',
                    },
                  }}
                  onClientUploadComplete={res => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type='button' variant='ghost'>
                取消
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant='primary' type='submit'>
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
