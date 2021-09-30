import role, { RoleValue } from './role';
import text, { TextValue } from './text';
import { BoardType } from './board';
import settings from '../store/setting';
export default class General {
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

    findTopPositions(position: number[], positions: number[][], board: BoardType) {
        const colIndex = position[1];
        let rowIndex = position[0] + 1;
        while (rowIndex < board.length && board[rowIndex][colIndex] === role.empty) {
            rowIndex++;
        }
        if (rowIndex < board.length && board[rowIndex][colIndex].text === text.redGeneral) {
            positions.push([rowIndex, colIndex]);
        }
    }

    findBottomPositions(position: number[], positions: number[][], board: BoardType) {
        const colIndex = position[1];
        let rowIndex = position[0] - 1;
        while (rowIndex >= 0 && board[rowIndex][colIndex] === role.empty) {
            rowIndex--;
        }
        if (rowIndex >= 0 && board[rowIndex][colIndex].text === text.blackGeneral) {
            positions.push([rowIndex, colIndex]);
        }
    }

    specialPosition(position: number[], positions: number[][], board: BoardType) {
        if (settings.isReverse) {
            this.type === role.black
                ? this.findBottomPositions(position, positions, board)
                : this.findTopPositions(position, positions, board);
        } else {
            this.type === role.black
                ? this.findTopPositions(position, positions, board)
                : this.findBottomPositions(position, positions, board);
        }
    }

    rule(position: number[], board: BoardType) {
        const positions: number[][] = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        const targetPositions = [
            [rowIndex - 1, colIndex], [rowIndex, colIndex + 1],
            [rowIndex + 1, colIndex], [rowIndex, colIndex - 1]
        ];
        // 四个点 逐一排除
        this.findPositions(targetPositions, positions, board);
        this.specialPosition(position, positions, board);
        return positions;
    }
}