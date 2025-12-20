import { IProfileRepo } from "#internal/interfaces/profile.repo.interface.js";
import { IProfileService } from "#internal/interfaces/profile.service.interface.js";
import { TypeUserWithoutPassword } from "#internal/types/user.type.js";
import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { PutObjectCommand, DeleteObjectCommand, S3 } from "@aws-sdk/client-s3";
import { User } from "src/prisma/index.js";

export class ProfileService implements IProfileService {
    constructor(
        private readonly profileRepo: IProfileRepo,
        private readonly s3: S3
    ) {}

    async #deleteOldAvatar(key: string): Promise<void> {
        if (!key) return;

        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });

        await this.s3.send(command);
    }

    async #uploadAvatar(avatarBuffer: Buffer): Promise<string> {
        const key = `avatars/${Date.now()}.png`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: key,
            Body: avatarBuffer,
            ContentType: "image/jpeg",
            ACL: "public-read",
        });

        await this.s3.send(command);

        return `${process.env.AWS_BUCKET_URL}/${process.env.AWS_BUCKET_NAME}/${key}`;
    }

    async getUser(id: string): Promise<TypeUserWithoutPassword | null> {
        const user = await this.profileRepo.get(id);
        if (!user) return null;

        const { password, ...safeUser } = user;
        return safeUser;
    }

    async createUser(user: User): Promise<User> {
        return this.profileRepo.create(user);
    }

    async updateUser(user: UpdateProfileRequest): Promise<TypeUserWithoutPassword> {
        const updatedUser = await this.profileRepo.update(user);
        const { password, ...safeUser } = updatedUser;
        return safeUser;
    }

    async updateAvatar(id: string, avatarBase64: string): Promise<string> {
        const user = await this.profileRepo.get(id);
        
        if (!user) throw new Error("Пользователь не найден");

        if (user.avatarUrl) {
            const oldKey = user.avatarUrl.replace(`${process.env.AWS_BUCKET_URL}/${process.env.AWS_BUCKET_NAME}/`, "");
            await this.#deleteOldAvatar(oldKey);
        }

        const base64Data = avatarBase64.split(",")[1];
        const avatarBuffer = Buffer.from(base64Data, "base64");

        const avatarUrl = await this.#uploadAvatar(avatarBuffer);

        await this.profileRepo.updateAvatar(id, avatarUrl);

        return avatarUrl;
    }
}
