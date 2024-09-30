export const makeEventUrl = (title: string, id: number): string => {
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  const url = `/events/${slug}/${id}`
  return url
}