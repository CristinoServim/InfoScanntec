export interface IDialogsOptions {
    headerMessage: string;
    bodyMessage?: string
}

export interface IDialogSucessOptions {
    headerMessage: string;
    bodyMessage?: string,
    time?: number,
}


export interface IDialogAlertConfirmOptions {
    headerMessage: string;
    bodyMessage?: string,
    finalMessage?: string
}

export interface IDialogPromise {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: any) => void;
}