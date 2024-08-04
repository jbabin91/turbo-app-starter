import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient, handleResponse } from '@/libs/api-client';

export async function getExample() {
  const response = await apiClient.example.$get();
  const { data } = await handleResponse(response);
  return data;
}

export function getExampleQueryOptions() {
  return queryOptions({
    queryFn: getExample,
    queryKey: ['example'],
  });
}

export function useExample() {
  return useQuery({ ...getExampleQueryOptions() });
}
