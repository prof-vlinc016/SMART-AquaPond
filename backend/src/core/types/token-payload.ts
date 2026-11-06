export interface TokenPayload {
    sub: string;
    role: "ADMIN" | "OPERATOR";
}