import { weekdayI18NEnum } from "@/types"

export function useCreateWeeKArray(startDay: number, numberOfDays: number): weekdayI18NEnum[] {
  const weekdays: weekdayI18NEnum[] = ['weekday.mo', 'weekday.tu', 'weekday.we', 'weekday.th', 'weekday.fr', 'weekday.sa', 'weekday.su']
  const resultArray: weekdayI18NEnum[] = []
  let i = 0
  let j = startDay
  while (i < numberOfDays) {
    if (j > 6) j = 0
    resultArray.push(weekdays[j])
    j++
    i++
  }
  return resultArray
}