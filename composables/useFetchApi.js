export const useFetchApi = async (method, request, payload, moreHeaders) => {
  const config = useRuntimeConfig();
  const response = await $fetch(request, {
    lazy: true,
    method: method,
    baseURL: config.public.baseApiURL,
    headers: moreHeaders,
    body: payload,
  });
  return response;
};
