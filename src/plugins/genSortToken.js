import { nanoid } from 'nanoid'

const firstSortToken = Array(50)
  .fill('-')
  .join('')
const lastSortToken = Array(50)
  .fill('z')
  .join('')

export const genSortToken = (
  { prev = firstSortToken, next = lastSortToken } = {
    prev: firstSortToken,
    next: lastSortToken,
  },
) => {
  prev = prev || firstSortToken
  next = next || lastSortToken
  if (next <= prev) {
    throw new Error(`SortToken is broken at ${prev}  ${next}`)
  }
  ;[prev, next] = [prev, next].sort()

  let id
  while (true) {
    id = nanoid(50)
    if (prev < id && id < next) return id
  }
}
