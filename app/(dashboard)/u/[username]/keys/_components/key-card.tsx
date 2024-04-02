'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CopyButton } from './copy-button';

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className='rounded-xl bg-muted p-6 shadow-md'>
      <div className='flex items-start gap-x-10'>
        <p className='font-semibold shrink-0'>密钥</p>
        <div className='space-y-2 w-full'>
          <div className='w-full flex items-center gap-x-2'>
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder='stream 密钥'
            />
            <CopyButton value={value || ''} />
          </div>
          <Button onClick={() => setShow(!show)} size='sm' variant='link'>
            {show ? '隐藏' : '显示'}
          </Button>
        </div>
      </div>
    </div>
  );
};
