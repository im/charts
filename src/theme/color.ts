export const themeColorMap:any = {
    westeros: [
        '#516b91',
        '#59c4e6',
        '#edafda',
        '#93b7e3',
        '#a5e7f0',
        '#cbb0e3'
    ],
    wonderland: [
        '#4ea397',
        '#22c3aa',
        '#7bd9a5',
        '#d0648a',
        '#f58db2',
        '#f2b3c9'
    ],
    walden: [
        '#3fb1e3',
        '#6be6c1',
        '#626c91',
        '#a0a7e6',
        '#c4ebad',
        '#96dee8'
    ],
    chalk: [
        '#fc97af',
        '#87f7cf',
        '#f7f494',
        '#72ccff',
        '#f7c5a0',
        '#d4a4eb',
        '#d2f5a6',
        '#76f2f2'
    ],
    macarons: [
        '#2ec7c9',
        '#b6a2de',
        '#5ab1ef',
        '#ffb980',
        '#d87a80',
        '#8d98b3',
        '#e5cf0d',
        '#97b552',
        '#95706d',
        '#dc69aa',
        '#07a2a4',
        '#9a7fd1',
        '#588dd5',
        '#f5994e',
        '#c05050',
        '#59678c',
        '#c9ab00',
        '#7eb00a',
        '#6f5553',
        '#c14089'
    ]
}

export const themeColorList = Object.keys(themeColorMap).map(key => {
    return { value: key, color: themeColorMap[key] }
})