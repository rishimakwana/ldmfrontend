export const formatToTitleCase = (value: string) => {
  value = String(value || '')
  value = value.replace(/_/g, ' ').replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
  value = value.toLowerCase()
  value = value.replace(/(^|\s)\w/g, (match) => match.toUpperCase())
  return value
}


type Color = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'

export const getStatusColor = (status: string): Color => {
  status = String(status)

  const color: Record<string, string> = {
    inactive: 'default',
    draft: 'default',
    active: 'success',
    paid: 'success',
    completed: 'success',
    booked: 'success',
    approved: 'success',
    closed: 'success',
    verified: 'success',
    issued: 'success',
    partiallyPaid: 'success',
    pending: 'warning',
    notVerified: 'warning',
    open: 'warning',
    unpaid: 'warning',
    cancel: 'error',
    incomplete: 'error',
    rejected: 'error',
    cancelled: 'error',
    reject: 'error',
    expired: 'error',
    failed: 'error',
  }

  return (color[status] || 'default') as Color
}


export const removeSpace = (value: string) => value.replaceAll(' ', '')


export const attrDoubleQuoteToSingle = (value: string) => {

  return value.split('="').map((item, index) => {
    if (index === 0) return item
    const attrEndDoubleQuoteIndex = item.indexOf('"')
    let temArray = item.split('')
    temArray[attrEndDoubleQuoteIndex] = "'"
    item = temArray.join('')
    return item
  }).join(`='`)
}


export const htmlToText = (html: string): string => {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = html
  return (tempElement.textContent || tempElement.innerText || '').trim()
}
