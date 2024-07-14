'use server';

import { revalidateTag } from 'next/cache';

const revalidate = async (tag: string) => {
  revalidateTag(tag);
};

export default revalidate;
