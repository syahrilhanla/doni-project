interface FilesType{
    chapterOne : string
    chaptertwo : string
    chapterThree : string
    chapterFour : string
    chapterFive : string
}

interface NotificationsType{
    id: string
    isRead : boolean
    text : string
    title : string
}

interface SeminarDateType{
    dateToBe :string
    feedbackNoteByProfOne : string
    feedbackNoteByProfTwo : string
    isApprovedByProfOne : string
    isApprovedByProfTwo : string
}
interface SidangDateType{
    dateToBe :string
    feedbackNoteByProfOne : string
    feedbackNoteByProfTwo : string
    isApprovedByProfOne : string
    isApprovedByProfTwo : string
}
interface TitleType{
    feedbackNoteByProfOne : string
    feedbackNoteByProfTwo : string
    isApprovedByProfOne : string
    isApprovedByProfTwo : string
    titleText : string
}

export interface StudentsData {
    email : string
    examinerOne : string
    examinerTwo: string
    fileSeminar : string
    fileSidang : string
    files: Array<FilesType>
    generation :string
    name : string
    note : string
    notifications: Array<NotificationsType>
    password : string
    phoneNumber : string
    profOne : string
    profTwo : string
    profilePict : string
    progressStatus : string
    proposalDate : string
    role : string
    seminarDate : Array<SeminarDateType>
    sidangDate : Array<SidangDateType>
    statusApprove: boolean
    title : Array<TitleType>
    uid :string
    username : string
}

interface NotificationsTypeProf{
    id: string
    isRead : boolean
    text: string
    title : string
}

export interface ProfessorsData{
    name : string
    nip : string
    notifications : Array<NotificationsTypeProf>
    password : string
    role : string
    uid : string
    username : string
}