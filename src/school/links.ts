// Where the school sends its students.

export const ATLAS_URL = 'https://atlas.grain.school'
export const ATLAS_HOST = 'atlas.grain.school'
export const GRAIN_URL = 'https://github.com/grain-ww/grain'
export const SOURCE_URL = 'https://github.com/node777/grain-school'

/** A deep link into one of the atlas's views (it routes by hash). */
export const atlasView = (id: string): string => `${ATLAS_URL}/#/${id}`
