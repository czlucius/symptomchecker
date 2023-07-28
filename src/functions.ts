export class UserInfo {
    name: string
    currentDiseases: Diseases[]
    detected: Diseases[]
}

export enum Diseases {
    Diabetes = "Diabetes",
    Hypertension = "Hypertension",
}

export const diseaseToMachineMap = {
    "Diabetes": "1",
    "Hypertension": "1",
}

export function getUserResult(id): UserInfo {
    return {
        name: "Clueless Bopha",
        currentDiseases: [],
        detected: [Diseases.Diabetes, Diseases.Hypertension]
    }
}
export function t1(eng: string) {
    switch (eng.toLowerCase()) {
        case "diabetes":
            return "ជំងឺទឹកនោមផ្អែម"
            break
        case "hypertension":
            return "ជំងឺលើសឈាម"
        default:
            return eng
    }
}
