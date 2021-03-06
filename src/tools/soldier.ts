import role, { RoleValue } from './role';
import { TextValue } from './text';
import { BoardType } from './board';
import settings from '../store/setting';
export default class Soldier {
     type: RoleValue;
     text: TextValue;
    constructor(text: TextValue, type: RoleValue) {
        this.text = text;
        this.type = type;
    }

    findTopPositions(rowIndex: number, colIndex: number, positions: number[][], board: BoardType) {
        if (rowIndex <= 4 && board[rowIndex + 1][colIndex].type !== this.type) {
            positions.push([rowIndex + 1, colIndex]);
        } else if (rowIndex > 4) {
            if (colIndex !== 0 && board[rowIndex][colIndex - 1].type !== this.type) {
                positions.push([rowIndex, colIndex - 1]);
            }
            if (colIndex !== board[0].length - 1 && board[rowIndex][colIndex + 1].type !== this.type) {
                positions.push([rowIndex, colIndex + 1]);
            }
            if (rowIndex !== board.length - 1 && board[rowIndex + 1][colIndex].type !== this.type) {
                positions.push([rowIndex + 1, colIndex]);
            }
        }
    }

    findBottomPositions(rowIndex: number, colIndex: number, positions: number[][], board: BoardType) {
        if (rowIndex >= 5 && board[rowIndex - 1][colIndex].type !== this.type) {
            positions.push([rowIndex - 1, colIndex]);
        } else {
            if (colIndex !== 0 && board[rowIndex][colIndex - 1].type !== this.type) {
                positions.push([rowIndex, colIndex - 1]);
            }
            if (colIndex !== board[0].length - 1 && board[rowIndex][colIndex + 1].type !== this.type) {
                positions.push([rowIndex, colIndex + 1]);
            }
            if (rowIndex !== 0 && board[rowIndex - 1][colIndex].type !== this.type) {
                positions.push([rowIndex - 1, colIndex]);
            }
        }
    }

    findPositions(rowIndex: number, colIndex: number, positions: number[][], board: BoardType) {
        if (settings.isReverse) {
            this.type === role.black
                ? this.findBottomPositions(rowIndex, colIndex, positions, board)
                : this.findTopPositions(rowIndex, colIndex, positions, board);
        } else {
            this.type === role.black
                ? this.findTopPositions(rowIndex, colIndex, positions, board)
                : this.findBottomPositions(rowIndex, colIndex, positions, board);
        }
    }

    rule(position: number[], board: BoardType) {
        const positions: number[][] = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        this.findPositions(rowIndex, colIndex, positions, board);
        return positions;
    }
}