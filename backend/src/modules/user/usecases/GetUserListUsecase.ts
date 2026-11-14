import { UserRepository } from "../contracts/user-repository.js";
import { UserNotifier } from "../contracts/user-notitfier.js";

export class GetUserListUsecase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userNotifier: UserNotifier
    ) {}

    async execute() {
        const results = await this.userRepository.findAll();
        this.userNotifier.notifyOnlineUsers();
        return results;
    }
}