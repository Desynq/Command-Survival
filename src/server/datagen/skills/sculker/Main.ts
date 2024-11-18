import { carnivoreSkills } from "./CarnivoreSkills";
import { rootSkills } from "./RootSkills";



const json = {};

Object.assign(json, rootSkills);
Object.assign(json, carnivoreSkills);

JsonIO.write("config/puffish_skills/categories/origins/sculker/definitions.json" as any, json as any);