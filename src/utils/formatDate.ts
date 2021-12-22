/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const formatDate = (date: string) => {
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs(date)
      .locale('zh-cn')
      .from(dayjs())
  }
}

export const hours = (date:string) => {
  if (dayjs(date).isBefore(dayjs(date).format('YYYY-MM-DD 00:000:00'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1天内
    return dayjs(date).format('HH:mm:ss')
  }
}
