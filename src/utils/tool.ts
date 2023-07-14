/* eslint-disable @typescript-eslint/no-explicit-any */
// 获取链接(url)上的制定参数
export const getUrlQueryString = (name: string) => {
  const query_string = window.location.href.split('?')[1]
  if (!query_string) return null // 如果无参，返回null
  const re = /[?&]?([^=]+)=([^&]*)/g
  let tokens
  while ((tokens = re.exec(query_string))) {
    if (decodeURIComponent(tokens[1]) === name) {
      return decodeURIComponent(tokens[2])
    }
  }
  return null
}

// 时间戳转换
export const time_cycle = (type: number, timestamp: any) => {
  const time: any = new Date(timestamp)
  const year: any = time.getFullYear()
  let month: any = time.getMonth() + 1
  let date: any = time.getDate()
  let hours: any = time.getHours()
  let minute: any = time.getMinutes()
  let second: any = time.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  if (type === 1) {
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
  } else if (type === 2) {
    return month + '-' + date + ' ' + hours + ':' + minute
  } else if (type === 3) {
    return year + '-' + month + '-' + date
  } else if (type === 4) {
    return hours + ':' + minute
  } else if (type === 5) {
    return month + '-' + date
  } else {
    return month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  }
}
