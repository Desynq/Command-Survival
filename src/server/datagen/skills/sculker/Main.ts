import { carnivoreSkills } from "./CarnivoreSkills";
import { PingSkills } from "./PingSkills";
import { rootSkills } from "./RootSkills";



const json = {};

Object.assign(json, rootSkills);
Object.assign(json, carnivoreSkills);
Object.assign(json, PingSkills);

JsonIO.write("config/puffish_skills/categories/origins/sculker/definitions.json" as any, json as any);