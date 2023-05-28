export interface Result {
    id: number;
    itemName : string;
    point: number;
    position: number;
    team : "WHITE" | "YELLOW" | "UNKNOWN" | "BLUE" | "GREEN",
}

export interface ResultFormatted {
    blue : Result[],
    green : Result[],
    yellow : Result[],
    white : Result[],
    unknown? : Result[],
}

export interface ResultValue {
    blue : number,
    green : number,
    yellow : number,
    white: number,
}