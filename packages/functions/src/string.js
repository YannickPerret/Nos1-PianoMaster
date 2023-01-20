export const capitalize = (str) => {
    return str.chartAt(0).toUpperCase() + str.slice(1)
}