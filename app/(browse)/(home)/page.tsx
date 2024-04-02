import { Suspense } from 'react';

import { Results, ResultsSkeleton } from './_components/results';

export default function Page() {
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto bg-[#f2f4f8]'>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
