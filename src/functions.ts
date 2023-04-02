export class UserInfo {
    name: string
    currentDiseases: Diseases[]
    detected: Diseases[]
}

export enum Diseases {
    Diabetes,
    Hypertension,
    Vaginal_Infection,
    Other
}

export function getUserResult(id): UserInfo {
    return {
        name: "Clueless Bopha",
        currentDiseases: [],
        detected: [Diseases.Diabetes, Diseases.Hypertension]
    }
}
