import {useRootLoaderData} from './root-data';

export default function useLocalURL(primaryDomainUrl: string) {
  const {publicStoreDomain} = useRootLoaderData();
  const getter = (url: string) =>
    url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;
  return getter;
}
