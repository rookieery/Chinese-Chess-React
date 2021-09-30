export type RoleEmpty = {
    type: 0,
    text: ''
};
export type RoleValue = 'red' | 'black' | RoleEmpty;
type Role = {
    [key in string]: RoleValue
}
export const roleEmpty: RoleEmpty = {
    type: 0,
    text: ''
};
const role: Role = {
    red: 'red',
    black: 'black',
    empty: roleEmpty,
};
export default role;
