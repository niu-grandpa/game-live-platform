import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
      <h1 className='text-4xl'>404</h1>
      <p>未找到当前用户</p>
      <Button variant='secondary' asChild>
        <Link href='/'>返回首页</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
