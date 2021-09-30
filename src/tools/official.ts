import role, { RoleValue } from './role';
import { TextValue } from './text';
import { BoardType } from './board';
import settings from '../store/setting';
export default class Official {
     type: RoleValue;
     text: TextValue;
    constructor(text: TextValue, type: RoleValue) {
        this.text = text;
        this.type = type;
    }

    findPositions(targetPositions: number[][], positions: number[][], board: BoardType) {
        for (let i = 0; i < targetPositions.length; i++) {
            const targetPosition = targetPositions[i];
            const rowIndex = targetPosition[0];
            const colIndex = targetPosition[1];
            if (colIndex < 3 || colIndex > 5) {
                continue;
            }
            // 判断出宫
            if (settings.isReverse) {
                if (this.type === role.red && (rowIndex < 0 || rowIndex > 2)) {
                    continue;
                }
                if (this.type === role.black && (rowIndex >= board.length || rowIndex < board.length - 3)) {
                    continue;
                }
            } else {
                if (this.type === role.black && (rowIndex < 0 || rowIndex > 2)) {
                    continue;
                }
                if (this.type === role.red && (rowIndex >= board.length || rowIndex < board.length - 3)) {
                    continue;
                }
            }
            if (board[rowIndex][colIndex].type === this.type) {
                continue;
            }
            positions.push([rowIndex, colIndex]);
        }
    }

    rule(position: number[], board: BoardType) {
        const positions: number[][] = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        const targetPositions = [
            [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex + 1],
            [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex + 1]
        ];
        // 四个点 逐一排除
        this.findPositions(targetPositions, positions, board);
        return positions;
    }
}