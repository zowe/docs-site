import React from 'react'
import { DocSearch } from "@docsearch/react";
import useAlgoliaContextualFacetFilters from '@theme/hooks/useAlgoliaContextualFacetFilters';

function SearchHeader() {
  const facetFilters = useAlgoliaContextualFacetFilters();
  return (
    <DocSearch
    apiKey="de714331a88daaf9b541b4ad68c19d84"
    appId="1AB1S8E42B"
    indexName="zowe"
    searchParameters={{
      facetFilters
    }}
    />
  )
}

export default SearchHeader
