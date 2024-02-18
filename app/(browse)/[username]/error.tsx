'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
      <p>页面出错了</p>
      <Button variant='secondary' asChild>
        <Link href='/'>返回首页</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
