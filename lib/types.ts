import { getLinks } from "./data";

export type SectionName = (ReturnType<typeof getLinks>)[number]["name"];