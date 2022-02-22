import { weekdayShortsEnum } from "@/types"

export function useCreateWeeKArray(startDay: number, numberOfDays: number): weekdayShortsEnum[] {
  const weekdays: weekdayShortsEnum[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const resultArray: weekdayShortsEnum[] = []
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