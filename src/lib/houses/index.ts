import { signs, type ZodiacSign } from "@/lib/zodiac";
import { houses, kindText, type House } from "./data";
import type { HouseNumber, HousePlanetSlug, HousePlanetText, HouseText } from "./types";
import { sun } from "./planets/sun";
import { moon } from "./planets/moon";
import { mercury } from "./planets/mercury";
import { venus } from "./planets/venus";
import { mars } from "./planets/mars";
import { jupiter } from "./planets/jupiter";
import { saturn } from "./planets/saturn";

export { houses, kindText } from "./data";
export type { House } from "./data";
export type { HouseNumber, HousePlanetSlug, HousePlanetText, HouseText } from "./types";

/** Planets in chart order. */
export const housePlanets: HousePlanetText[] = [sun, moon, mercury, venus, mars, jupiter, saturn];

const planetBySlug = new Map(housePlanets.map((p) => [p.slug, p]));
export const getHousePlanet = (slug: string) => planetBySlug.get(slug as HousePlanetSlug);

export const houseNumbers = houses.map((h) => h.number);

export const ordinalHouse = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

export const houseSlug = (n: HouseNumber) => `${ordinalHouse(n)}-house`;
export const housePath = (n: HouseNumber) => `/houses/${houseSlug(n)}`;
export const planetHouseSlug = (p: HousePlanetSlug, n: HouseNumber) => `${p}-in-${ordinalHouse(n)}-house`;
export const planetHousePath = (p: HousePlanetSlug, n: HouseNumber) => `/houses/${planetHouseSlug(p, n)}`;

const houseBySlug = new Map(houses.map((h) => [houseSlug(h.number), h]));
export const getHouseBySlug = (slug: string) => houseBySlug.get(slug);

/** The sign that naturally corresponds to a house (1st ↔ Aries … 12th ↔ Pisces). */
export const naturalSign = (n: HouseNumber): ZodiacSign => signs[n - 1];

export interface PlanetInHouse {
  slug: string;
  planet: HousePlanetText;
  house: House;
  text: HouseText;
  title: string;
  /** The planet rules the house's natural sign (modern or traditional). */
  rulesHouse: boolean;
}

export const planetInHouses: PlanetInHouse[] = housePlanets.flatMap((planet) =>
  houses.map((house) => {
    const sign = naturalSign(house.number);
    return {
      slug: planetHouseSlug(planet.slug, house.number),
      planet,
      house,
      text: planet.houses[house.number],
      title: `${planet.name} in the ${house.name}`,
      rulesHouse: sign.ruler === planet.name || sign.traditionalRuler === planet.name,
    };
  }),
);

const bySlug = new Map(planetInHouses.map((p) => [p.slug, p]));
export const getPlanetInHouse = (slug: string) => bySlug.get(slug);
export const getPlanetInHouseFor = (p: HousePlanetSlug, n: HouseNumber) => bySlug.get(planetHouseSlug(p, n))!;

export const planetInHousesForPlanet = (p: HousePlanetSlug) => planetInHouses.filter((x) => x.planet.slug === p);
export const planetInHousesForHouse = (n: HouseNumber) => planetInHouses.filter((x) => x.house.number === n);

export function planetHouseFaqs(x: PlanetInHouse) {
  const { planet, house, text } = x;
  const sign = naturalSign(house.number);
  return [
    { q: `What does ${x.title} mean?`, a: text.blurb },
    {
      q: `How do I find my ${planet.name} house?`,
      a: `Your houses depend on your exact birth time and place, so you need both to calculate them. Skygram works out your full natal chart, including which house your ${planet.name} sits in, for free.`,
    },
    {
      q: `What is the ${house.name} about?`,
      a: `${house.summary} It is associated with ${sign.name} in the zodiac wheel.`,
    },
    {
      q: `Is ${x.title} a strong placement?`,
      a: `${kindText[house.kind].text} ${x.rulesHouse ? `Many modern astrologers also note that ${planet.name} rules ${sign.name}, the sign linked with this house, and see that as a natural fit. Traditional astrology instead judges planetary strength by dignity and by each planet's \"joy\" house.` : ""}`.trim(),
    },
  ];
}
