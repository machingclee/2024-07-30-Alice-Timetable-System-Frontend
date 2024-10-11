export type CustomResponse<T> =
    {
        success: true
        result: T
    } |
    {
        success: false,
        errorMessage?: string
        errorObject?: { [key: string]: string }
    }

