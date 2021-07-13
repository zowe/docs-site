import React from 'react'
import { DocSearch } from "@docsearch/react";
import useAlgoliaContextualFacetFilters from '@theme/hooks/useAlgoliaContextualFacetFilters';

function SearchHeader() {
  const facetFilters = useAlgoliaContextualFacetFilters();
  return (
    <DocSearch
    apiKey="59ff39ed48d0820010c7e09fc4b677bf"
    indexName="zowe"
    searchParameters={{
      facetFilters
    }}
    />
  )
}

export default SearchHeader
