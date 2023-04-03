{
    qns:
        [{
            title: "Do you smoke often?",
            subtitle: "Smoking may increase your risk of hypertension.",
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 0
        }, {
            title: "What is your BMI?",
            subtitle: "A higher BMI increases risk of hypertension",
            type: SurveyType.MultiChoice,
            options: ["<18.5", "18.5-24.9", ">25"],
            trigger: ">25",
            num: 1
        }, {
            title: "Do your parents/siblings have high blood pressure?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 2
        }],
    title: "Vaginal infection ជំងឺហូរទឹករំអិលទ្វារមាស",
    id: 1,
    disease: "vaginal infection",
    machineNo: 2,
    diseaseEnum: Diseases.Vaginal_Infection
}