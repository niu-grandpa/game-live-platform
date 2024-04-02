'use client';

import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { createIngress } from '@/actions/ingress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('入口方式创建成功');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('出错了'));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>生成连接</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>生成连接</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={value => setIngressType(value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='入口类型' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>注意!</AlertTitle>
          <AlertDescription>
            此操作将重置使用当前连接的所有活动流
          </AlertDescription>
        </Alert>
        <div className='flex justify-between'>
          <DialogClose ref={closeRef} asChild>
            <Button variant='ghost'>取消</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} variant='primary'>
            生成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
