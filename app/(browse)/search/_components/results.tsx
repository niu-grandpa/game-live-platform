import { Skeleton } from '@/components/ui/skeleton';
import { getSearch } from '@/lib/search-service';

import { ResultCard, ResultCardSkeleton } from './result-card';

interface ResultsProps {
  term?: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>
        相关的搜索结果 &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className='text-muted-foreground text-sm'>
          未找到结果。尝试搜索其他内容
        </p>
      )}
      <div className='flex flex-col gap-y-4'>
        {data.map(result => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className='h-8 w-[290px] mb-4' />
      <div className='flex flex-col gap-y-4'>
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
