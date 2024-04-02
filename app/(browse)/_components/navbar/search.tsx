'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) {
      return router.replace('/');
    }

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue('');
    router.replace('/');
  };

  return (
    <form
      onSubmit={onSubmit}
      className='border-solid border-2 border-[#f9f9fa]  flex items-center rounded-lg'>
      <div className='relative w-full lg:w-[340px]'>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='搜索用户'
          className='rounded-r-none'
        />
        {value && (
          <X
            className='absolute top-2.5 right-[8px] h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
            onClick={onClear}
          />
        )}
      </div>
      <Button type='submit' variant='primary' className='rounded-l-none'>
        <SearchIcon
          className='h-5 w-5 text-muted-foreground'
          style={{ color: '#fff' }}
        />
        &nbsp;&nbsp;搜索
      </Button>
    </form>
  );
};
