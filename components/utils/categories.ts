import {
  beautyCat,
  womenCat,
  menCat,
  deviceCat,
  autoMobileCat,
  homeCat,
  sportsCat,
  groceriesCat,
} from "@/components/subComp/Categories";

export const getSubcategories = (mainCat: string): string[] => {
  switch (mainCat.toLowerCase()) {
    case "women": return womenCat;
    case "men": return menCat;
    case "beauty": return beautyCat;
    case "devices": return deviceCat;
    case "automobile": return autoMobileCat;
    case "home decors": return homeCat;
    case "sports": return sportsCat;
    case "groceries": return groceriesCat;
    default: return [];
  }
};