import { signForDate, signs, type ZodiacSign } from "@/lib/zodiac";
import {
  DAYS_IN_MONTH,
  MONTHS,
  decanPlanets,
  monthLore,
  ordinalWord,
} from "./content";
import type { PlanetName } from "./types";

export { MONTHS, dayNumberMeaning, monthLore, ordinal, ordinalWord, planetFlavour } from "./content";
export type { PlanetName } from "./types";

// A leap year, so 29 Feb exists and sign ranges can wrap the new year.
const ordinalDay = (m: number, d: number) => Math.round((Date.UTC(2024, m - 1, d) - Date.UTC(2024, 0, 1)) / 86_400_000) + 1;
const YEAR_LEN = 366;

export const monthSlug = (m: number) => MONTHS[m - 1].toLowerCase();
export const dateSlug = (m: number, d: number) => `${monthSlug(m)}-${d}`;
export const monthPath = (m: number) => `/birthday/${monthSlug(m)}`;
export const datePath = (m: number, d: number) => `/birthday/${dateSlug(m, d)}`;
export const dateLabel = (m: number, d: number) => `${MONTHS[m - 1]} ${d}`;

export interface BirthdayDate {
  slug: string;
  month: number;
  day: number;
  label: string;
  sign: ZodiacSign;
  /** 1-based day of the sign's season (1 = first day). */
  dayInSign: number;
  signLength: number;
  decan: 1 | 2 | 3;
  decanRuler: PlanetName;
  /** Inclusive [start, end] of this decan as calendar days. */
  decanRange: [[number, number], [number, number]];
  /** Set when the date is within two days of a sign boundary. */
  cusp?: { other: ZodiacSign; /** true if the neighbour is the earlier sign */ earlier: boolean; edge: "first" | "second" | "penultimate" | "last" };
  dayOfYear: number;
}

const fromOrdinal = (o: number): [number, number] => {
  const dt = new Date(Date.UTC(2024, 0, ((o - 1 + YEAR_LEN) % YEAR_LEN) + 1));
  return [dt.getUTCMonth() + 1, dt.getUTCDate()];
};

const signIndex = (s: ZodiacSign) => signs.findIndex((x) => x.slug === s.slug);

function build(month: number, day: number): BirthdayDate {
  const sign = signForDate(month, day);
  const si = signIndex(sign);
  const startOrd = ordinalDay(...sign.start);
  const signLength = ((ordinalDay(...sign.end) - startOrd + YEAR_LEN) % YEAR_LEN) + 1;
  const dayInSign = ((ordinalDay(month, day) - startOrd + YEAR_LEN) % YEAR_LEN) + 1;

  // Decans are conventionally ten-day blocks; the third decan absorbs any 11th day.
  const decan = (Math.min(3, Math.ceil(dayInSign / 10)) as 1 | 2 | 3);
  const decanRuler = decanPlanets[(si * 3 + decan - 1) % 7];
  const decanStart = startOrd + (decan - 1) * 10;
  const decanEnd = decan === 3 ? startOrd + signLength - 1 : decanStart + 9;

  let cusp: BirthdayDate["cusp"];
  if (dayInSign <= 2) {
    cusp = { other: signs[(si + 11) % 12], earlier: true, edge: dayInSign === 1 ? "first" : "second" };
  } else if (dayInSign >= signLength - 1) {
    cusp = { other: signs[(si + 1) % 12], earlier: false, edge: dayInSign === signLength ? "last" : "penultimate" };
  }

  return {
    slug: dateSlug(month, day),
    month,
    day,
    label: dateLabel(month, day),
    sign,
    dayInSign,
    signLength,
    decan,
    decanRuler,
    decanRange: [fromOrdinal(decanStart), fromOrdinal(decanEnd)],
    cusp,
    dayOfYear: ordinalDay(month, day),
  };
}

/** All 366 calendar dates, January 1 → December 31. */
export const birthdayDates: BirthdayDate[] = DAYS_IN_MONTH.flatMap((n, mi) =>
  Array.from({ length: n }, (_, di) => build(mi + 1, di + 1)),
);

const bySlug = new Map(birthdayDates.map((d) => [d.slug, d]));
export const getBirthdayDate = (slug: string) => bySlug.get(slug);

export const monthNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
export const getMonthBySlug = (slug: string) => {
  const i = MONTHS.findIndex((m) => m.toLowerCase() === slug);
  return i === -1 ? undefined : i + 1;
};

export const datesInMonth = (m: number) => birthdayDates.filter((d) => d.month === m);
export const datesInSign = (slug: string) => birthdayDates.filter((d) => d.sign.slug === slug);

export function neighbourDates(d: BirthdayDate) {
  const i = birthdayDates.indexOf(d);
  return { prev: birthdayDates[(i + birthdayDates.length - 1) % birthdayDates.length], next: birthdayDates[(i + 1) % birthdayDates.length] };
}

/** Days in the month when the Sun changes sign, e.g. Libra → Scorpio on October 23. */
export function signChangesInMonth(m: number) {
  return datesInMonth(m)
    .filter((d, i, arr) => i > 0 && arr[i - 1].sign.slug !== d.sign.slug)
    .map((d) => ({ date: d, from: birthdayDates[birthdayDates.indexOf(d) - 1].sign, to: d.sign }));
}

export const decanRangeText = (d: BirthdayDate) => {
  const [[m1, d1], [m2, d2]] = d.decanRange;
  return m1 === m2 ? `${MONTHS[m1 - 1]} ${d1}–${d2}` : `${MONTHS[m1 - 1]} ${d1} – ${MONTHS[m2 - 1]} ${d2}`;
};

export function birthdayFaqs(d: BirthdayDate) {
  const { sign } = d;
  const faqs = [
    {
      q: `What zodiac sign is ${d.label}?`,
      a: `${d.label} falls in ${sign.name}, which runs from ${MONTHS[sign.start[0] - 1]} ${sign.start[1]} to ${MONTHS[sign.end[0] - 1]} ${sign.end[1]} in the tropical zodiac. The Sun changes sign at a slightly different moment each year, so the boundary can fall a day or so either side of these dates. If you were born close to the edge, your birth year, time and place decide it.`,
    },
    {
      q: `Is ${d.label} a cusp birthday?`,
      a: d.cusp
        ? `Yes. ${d.label} sits within a day or two of the ${d.cusp.earlier ? `${d.cusp.other.name}–${sign.name}` : `${sign.name}–${d.cusp.other.name}`} boundary, and it is often said that people born this close to a boundary show traits of both signs. Astrologers still assign the Sun to one sign, and only a birth chart calculated from your birth year, time and place shows which.`
        : `Not by the usual definition, which counts the first and last couple of days of a sign. ${d.label} is day ${d.dayInSign} of ${sign.name} season, so it is normally read as a clear ${sign.name} birthday.`,
    },
    {
      q: `Which decan is ${d.label}?`,
      a: `${d.label} is in the ${ordinalWord[d.decan - 1]} decan of ${sign.name} (${decanRangeText(d)}). In the traditional Chaldean system this decan is ruled by ${d.decanRuler}, which astrologers say adds its own flavour to ${sign.name}. Some modern astrologers assign decan rulers by element instead, which gives different planets, and decans are strictly 10° slices of the zodiac, so the date range is approximate.`,
    },
    {
      q: `What are the birthstone and flower for ${MONTHS[d.month - 1]}?`,
      a: `The modern birthstone for ${MONTHS[d.month - 1]} is ${monthLore[d.month - 1].birthstone} and the birth flower is the ${monthLore[d.month - 1].flower.toLowerCase()}. These come from calendar tradition rather than astrology, and the lists vary by country and source.`,
    },
  ];
  if (d.month === 2 && d.day === 29) {
    faqs.push({
      q: "Which zodiac sign is a Leap Day baby?",
      a: "February 29 falls in Pisces. Because it only occurs in leap years, Leap Day babies share a Sun sign with everyone born from February 19 to March 20.",
    });
  }
  return faqs;
}
