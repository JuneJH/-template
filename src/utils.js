/**
 * 比较两个数值
 * @param {*} a number
 * @param {*} b 
 * @returns 
 */
const compare = (a, b) => a > b ? true : false;
/**
 * 根据数组下标交换数组位置
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */
const change = (arr, a, b) => { [arr[a], arr[b]] = [arr[b], arr[a]] }


module.exports = {
    compare,
    change
}