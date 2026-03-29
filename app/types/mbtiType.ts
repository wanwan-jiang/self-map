export interface MbtiOption {
    id: string
    label: string
    text: string
}

export interface MbtiQuestion {
    id: string
    dimension: string
    title: string
    options: MbtiOption[]
}
