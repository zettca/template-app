import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

const oneOf = faker.helpers.arrayElement;

export const assetsDb = factory({
  asset: {
    id: primaryKey(String),
    name: () => `Event ${faker.music.songName()}`,
    description: () => faker.lorem.words(12),
    status: () => oneOf(["Closed", "Open"]),
    severity: () => oneOf(["Critical", "Major", "Average", "Minor"]),
    priority: () => oneOf(["High", "Medium", "Low", "Minor"]),
    time: () => faker.date.past(3),
    temperature: () => faker.datatype.number(100),
  },
});
