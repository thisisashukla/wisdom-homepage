"""Canonical corpus names, shared by query planning and legacy reference lookup."""
ALIASES = {
    'gita':'bhagwad_gita', 'bhagavad_gita':'bhagwad_gita', 'bhagvad_gita':'bhagwad_gita',
    'bhagavadgita':'bhagwad_gita', 'bhagavad_geeta':'bhagwad_gita',
    'kath_upanishad':'katha_upanishad', 'ramayana':'ramayan', 'ramcharitmanas':'ramacharitamanas',
}

def canonical_scripture(value: str) -> str:
    slug = value.strip().casefold().replace(' ', '_').replace('-', '_')
    return ALIASES.get(slug, slug)
