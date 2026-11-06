/** Reference links for /learn. Prefer a DOI or PubMed ID; fall back to a PubMed title search. */
export const doi = (d: string) => `https://doi.org/${d}`
export const pmid = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`
export const pmc = (id: string) => `https://pmc.ncbi.nlm.nih.gov/articles/${id}/`
export const pubmed = (title: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(title)}`
