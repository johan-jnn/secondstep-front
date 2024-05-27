import type {
  PredictiveQueryFragment,
  PredictiveProductFragment,
  PredictiveCollectionFragment,
  PredictivePageFragment,
  PredictiveArticleFragment,
  SearchQuery,
} from 'storefrontapi.generated';
import algoliasearch from 'algoliasearch';

// ! En environnement de développement, algoliasearch est `undefined`
if (algoliasearch?.name) {
  console.log('>> ALGOLIA SEARCH IS NOW AVAILABLE');
  // const search = algoliasearch('SDF2554WHI', '3dc97f4efed43e70ceb2e3dd520399aa');
  // console.log(search);
} else {
  console.error('!! ALGOLIA SEARCH IS NOT AVAILABLE !!');
}

export function applyTrackingParams(
  resource:
    | PredictiveQueryFragment
    | SearchQuery['products']['nodes'][number]
    | PredictiveProductFragment
    | PredictiveCollectionFragment
    | PredictiveArticleFragment
    | PredictivePageFragment,
  params?: string,
) {
  if (params) {
    return resource?.trackingParameters
      ? `?${params}&${resource.trackingParameters}`
      : `?${params}`;
  } else {
    return resource?.trackingParameters
      ? `?${resource.trackingParameters}`
      : '';
  }
}
