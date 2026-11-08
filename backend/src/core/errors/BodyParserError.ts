export interface BodyParserError extends SyntaxError {
    status: number;
    statusCode: number;
    type: string;
    body: string;
}

export function IsBodyParserError(error: unknown): error is BodyParserError {
    return (
        error instanceof SyntaxError &&
        "status" in error &&
        "statusCode" in error &&
        "type" in error &&
        "body" in error
    );
}
