export interface RealtimeEventPublisher {
    publishToUser(
        userId: string,
        event: string,
        payload: unknown
    ): void;

    publishToUsers(
        userIds: string[],
        event: string,
        payload: unknown
    ): void;
}