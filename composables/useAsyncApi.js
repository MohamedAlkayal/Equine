export const useAsyncApi = (method, request, payload, moreHeaders) => {
  const config = useRuntimeConfig();
  return useFetch(request, {
    lazy: true,
    method: method,
    baseURL: config.public.baseApiURL,
    headers: moreHeaders,
    body: payload,
  });
};
