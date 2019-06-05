import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://reqres.in/api/users/';

export default class Users {
    public static async getOne(userId: string): Promise<Record<string, any>> {
        try {
            const apiRes = await axios.get(`${API_URL}${userId}`);
            return apiRes.data.data;
        } catch (e) {
            return e;
        }
    }

    private static createDlFolderIfNeeded(): void {
        const dlFolder = path.resolve(__dirname, '..', 'downloads');
        if (!fs.existsSync(dlFolder)) fs.mkdirSync(dlFolder);
    }

    private static async downloadAvatarIfNeeded(avatarFile: string, url: string): Promise<void> {
        if (!fs.existsSync(avatarFile)) {
            const avatar = await axios.get(url, { responseType: 'stream' });
            const writer = fs.createWriteStream(avatarFile, 'base64');
            avatar.data.pipe(writer);
            return new Promise<void>(
                (resolve, reject): void => {
                    writer.on('error', (err): void => reject(err));
                    writer.on('finish', resolve);
                },
            );
        }
    }

    public static async getOneAvatar(userId: string): Promise<string> {
        const apiRes: Record<string, any> = await axios.get(`${API_URL}${userId}`);
        const { data } = apiRes.data;
        if ('avatar' in data) {
            this.createDlFolderIfNeeded();
            const avatarFile = path.resolve(__dirname, '..', 'downloads', `${userId}.jpg`);
            await this.downloadAvatarIfNeeded(avatarFile, data.avatar);
            return new Promise<string>(
                (resolve, reject): void => {
                    fs.readFile(
                        avatarFile,
                        (err, data): void => {
                            if (err) reject(err);
                            else resolve(data.toString('base64'));
                        },
                    );
                },
            );
        } else {
            throw new Error('NotFoundError');
        }
    }

    public static async deleteOneAvatar(userId: string): Promise<number> {
        const avatarFile = path.resolve(__dirname, '..', 'downloads', `${userId}.jpg`);
        if (fs.existsSync(avatarFile)) {
            return new Promise(
                (resolve, reject): void => {
                    fs.unlink(
                        avatarFile,
                        (err): void => {
                            if (err) reject(err);
                            else resolve(204);
                        },
                    );
                },
            );
        } else return 404;
    }
}
