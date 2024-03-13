export async function pMap<TItem, TResult>(
  data: TItem[],
  promiseFn: (item: TItem) => Promise<TResult>,
  concurrency: number
) {
  const count = Math.ceil(data.length / concurrency);
  const results: TResult[] = [];

  for (let i = 0; i < count; i++) {
    const chunks = await Promise.all(
      data
        .slice(i * concurrency, (i + 1) * concurrency)
        .map((item) => promiseFn(item))
    );
    results.push(...chunks);
  }

  return results;
}
