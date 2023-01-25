import React from 'react'
import { DocSearch } from "@docsearch/react";
import useAlgoliaContextualFacetFilters from '@theme/hooks/useAlgoliaContextualFacetFilters';

function SearchHeader() {
  const facetFilters = useAlgoliaContextualFacetFilters();
  return (
    <DocSearch
    apiKey="65cba55ab266253898f7ad088e57be78"
    indexName="zowe"
    searchParameters={{
      facetFilters
    }}
    />
  )
}

export default SearchHeader
