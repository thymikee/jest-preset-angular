import { Injectable } from "@angular/core";
import { HeroCategory, HeroColor } from "./hero-properties";

@Injectable({
  providedIn: "root"
})
export class HeroCategoryService {
  getCategoryForHero(heroName: string): HeroCategory {
    switch (heroName) {
      case "Joker":
        return HeroCategory.Evil;
      case "Batman":
        return HeroCategory.Good;
      default:
        return HeroCategory.Neutral;
    }
  }

  getColorForHero(heroName: string): HeroColor {
    switch (heroName) {
      case "Joker":
        return HeroColor.Purple;
      case "Batman":
        return HeroColor.Black;
      case "Catwoman":
        return HeroColor.Black;
      default:
        return HeroColor.Transparent;
    }
  }
}
