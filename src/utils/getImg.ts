export const getImg = (url: string) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href
}

export const getChartImg = (url: string) => {
    return new URL(`../assets/images/charts/${url}`, import.meta.url).href
}
