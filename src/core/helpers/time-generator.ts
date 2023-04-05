export enum Timer {
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export const timeGenerator = (time: number, timer: Timer): number => {
  const baseTime = 1000 * 60;
  switch (timer) {
    case Timer.MINUTE:
      return baseTime * time;
    case Timer.HOUR:
      return baseTime * 60 * time;
    case Timer.DAY:
      return baseTime * 60 * 24 * time;
    case Timer.WEEK:
      return baseTime * 60 * 24 * 7 * time;
    case Timer.MONTH:
      return baseTime * 60 * 24 * 30 * time;
    case Timer.YEAR:
      return baseTime * 60 * 24 * 365 * time;
    default:
      return baseTime * time;
  }
}

