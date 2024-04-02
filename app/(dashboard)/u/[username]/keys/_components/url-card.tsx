import { Input } from '@/components/ui/input';

import { CopyButton } from './copy-button';

interface UrlCardProps {
  value: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className='rounded-xl bg-muted p-6 shadow-md'>
      <div className='flex items-center gap-x-10'>
        <p className='font-semibold shrink-0'>服务器地址</p>
        <div className='space-y-2 w-full'>
          <div className='w-full flex items-center gap-x-2'>
            <Input value={value || ''} disabled placeholder='服务器地址' />
            <CopyButton value={value || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};
