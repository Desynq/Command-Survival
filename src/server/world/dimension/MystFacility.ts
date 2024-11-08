import { Debug } from "../../../libraries/Debug";
import { $BlockStateProperties } from "../../../libraries/JavaClasses";



export namespace MystFacility {
	const DIMENSION_NAME = "command_survival:myst/facility"
	const seed = 0;

	export function isDimension(level: Internal.Level | Internal.ServerLevel): boolean {
		return level.dimension.toString() === DIMENSION_NAME;
	}




	namespace LeverPuzzleAlpha {

		export function onRightClick(event: Internal.BlockRightClickedEventJS): void {
			const blockPos: number[] = [event.block.x, event.block.y, event.block.z];
			Debug.logAdmin(blockPos.toString());
			const isCorrect = isLeverCorrect(blockPos);
			Debug.logAdmin(String(isCorrect));
		}

		function getCorrectLeverPoweredState(leverPos: number[]): boolean {
			return (leverPos[0] ^ leverPos[1] ^ leverPos[2] ^ seed) % 2 === 0;
		}

		function isLeverCorrect(blockPos: number[]): boolean {
			const block = Utils.server.getLevel(DIMENSION_NAME).getBlock(blockPos[0], blockPos[1], blockPos[2]);
			if (!block || block.id !== "minecraft:lever") {
				return false;
			}

			const [x, y, z] = blockPos;
			const isPositionValid = z === -11 && y >= 64 && y <= 66 && x >= 14 && x <= 18;
			if (!isPositionValid) {
				return false;
			}

			return block.blockState.getValue($BlockStateProperties.POWERED) === getCorrectLeverPoweredState(blockPos);
		}
	}


	BlockEvents.rightClicked("minecraft:lever", event => {
		if (isDimension(event.level)) {
			LeverPuzzleAlpha.onRightClick(event);
		}
	});
}