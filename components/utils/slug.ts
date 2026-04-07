export const unslug = (str: string): string => str.replace(/-/g, ' ')

export const slugify = (str: string): string => str.toLowerCase().replace(/\s+/g, '-')
