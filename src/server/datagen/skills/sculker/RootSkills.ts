import { Definition } from "PuffishSkills";



const EXPERIENCE_EATER: Definition = {
	title: "Experience Eater",
	description: "Instead of consuming food for nutrition and saturation, you instead consume your experience in order to sate yourself.",
	icon: {
		type: "item",
		data: {
			item: "minecraft:experience_bottle"
		}
	},
	size: 1.5,
	cost: 0,
	required_skills: 0,
	rewards: []
}



const ECHO_VISION_DESCRIPTION = {
	"text": "",
	"color": "dark_aqua",
	"extra": [
		"While Sculkers are able to visually identify inorganic objects relatively easy due to their low-frequency sonar, they struggle to identify living organisms as easily due to the low frequencies getting absorbed by the organisms themselves.",
		"\n\n",
		"As such, Sculkers have evolved to be able to tune into sound frequencies and emit localized high frequency sonar in the direction of sounds in order to temporarily ping potential living organisms.",
		"\n\n",
		"This, however, requires active focus and takes an exhaustive toll on a Sculker's experience reserve as every sonar ping consumes a small amount of experience that can quickly stack up if a Sculker were to focus ping sounds all the time.",
		"\n\n",
		"The state of focus a Sculker needs to be in when pinging also distorts their vision severely as pinged entities are only visible in wavelengths outside of the visible color spectrum."
	]
}

const ECHO_VISION: Definition = {
	title: "Echo Vision",
	description: ECHO_VISION_DESCRIPTION,
	icon: {
		type: "effect",
		data: {
			effect: "kubejs:pinged"
		}
	},
	size: 1.5,
	cost: 0,
	required_skills: 0,
	rewards: []
}



export const rootSkills = {
	"experience-eater": EXPERIENCE_EATER,
	"echo_vision": ECHO_VISION
}