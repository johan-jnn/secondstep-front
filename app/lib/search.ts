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
// console.log(algoliasearch);

// const search = algoliasearch('SDF2554WHI', '3dc97f4efed43e70ceb2e3dd520399aa');
// console.log(search);

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
