import { async } from "@angular/core/testing";

import { HeroCategoryService } from "./hero-category.service";
import { HeroCategory, HeroColor } from './hero-properties';

describe("HeroCategoryService", () => {
  let service: HeroCategoryService;

  beforeEach(() => (service = new HeroCategoryService()));

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should return the right category for heroes", () => {
    expect(service.getCategoryForHero("Batman")).toEqual(HeroCategory.Good);
    expect(service.getCategoryForHero("Joker")).toEqual(HeroCategory.Evil);
    expect(service.getCategoryForHero("Catwoman")).toEqual(HeroCategory.Neutral);
  });

  it("should return the right color for heroes", () => {
    expect(service.getColorForHero("Batman")).toEqual(HeroColor.Black);
    expect(service.getColorForHero("Joker")).toEqual(HeroColor.Purple);
    expect(service.getColorForHero("The Penguin")).toEqual(HeroColor.Transparent);
  });

});
