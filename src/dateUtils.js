import {
  addDays,
  setHours,
  endOfWeek,
  startOfWeek,
  parseJSON as parseJSONDate,
  parseISO as parseISODate,
} from 'date-fns';
import { times } from 'lodash/fp';

export const startOfTheWeek = () => startOfWeek(new Date(), { weekStartsOn: 1 }); // week start on Monday
export const endOfTheWeek = () => endOfWeek(new Date(), { weekStartsOn: 1 }); // week start on Monday

export const mapWeekDays = (iteratee, date = startOfTheWeek()) =>
  times(i => iteratee(addDays(date, i)), 7);

export const mapDayHours = (iteratee, date = new Date()) =>
  times(i => iteratee(setHours(date, i + 1)), 24);

const parseEventDate = property =>
  property.date ? parseISODate(property.date) : parseJSONDate(property.dateTime);

export const getEventStartDate = event => parseEventDate(event.start);
export const getEventEndDate = event => parseEventDate(event.end);
