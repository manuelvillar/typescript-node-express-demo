/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { Readable } from 'stream';
import { existsSync } from 'fs';
import path from 'path';
import user from '../../services/user';

describe('services/user/getOne(1)', (): void => {
    it('should fetch user 1 data', async (): Promise<void> => {
        const userData = {
            data: {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
            },
        };
        const apiRes = {
            data: userData,
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' },
            config: {},
        };

        axios.get = jest.fn().mockReturnValue(apiRes);

        const userRes = await user.getOne('1');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(userRes).toEqual(userData.data);
    });
});

describe('services/user/getOne(13)', (): void => {
    it('should throw 404', async (): Promise<void> => {
        axios.get = jest.fn().mockImplementation(
            (): void => {
                throw new Error('User not found');
            },
        );

        const userRes = await user.getOne('1');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(userRes).toBeInstanceOf(Error);
    });
});

describe('services/user/getOneAvatar(1)', (): void => {
    it('should fetch user 1 avatar', async (): Promise<void> => {
        const userData = {
            data: {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
            },
        };

        const apiRes = {
            data: userData,
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' },
            config: {},
        };

        const avatarStream = new Readable();
        avatarStream.push(
            'FFD8FFE000104A46494600010101004800480000FFDB004300080606070605080707070909080A0C140D0C0B0B0C1912130F141D1A1F1E1D1A1C1C20242E2720',
            'binary',
        );
        avatarStream.push(null);

        const mockedAvatar = { data: avatarStream };

        axios.get = jest
            .fn()
            .mockReturnValueOnce(apiRes)
            .mockReturnValueOnce(mockedAvatar);

        const base64Avatar = await user.getOneAvatar('1');
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(base64Avatar).toEqual(
            'RkZEOEZGRTAwMDEwNEE0NjQ5NDYwMDAxMDEwMTAwNDgwMDQ4MDAwMEZGREIwMDQzMDAwODA2MDYwNzA2MDUwODA3MDcwNzA5MDkwODBBMEMxNDBEMEMwQjBCMEMxOTEyMTMwRjE0MUQxQTFGMUUxRDFBMUMxQzIwMjQyRTI3MjA=',
        );
    });
});

describe('services/user/deleteOneAvatar(1)', (): void => {
    it('should delete user 1 avatar', async (): Promise<void> => {
        const avatarFile = path.resolve(__dirname, '..', '..', 'downloads', '1.jpg');
        const status = await user.deleteOneAvatar('1');
        expect(existsSync(avatarFile)).toBeFalsy;
        expect(status).toEqual(204);
    });

    it('should not delete user 1 avatar if it has been already deleted', async (): Promise<void> => {
        const avatarFile = path.resolve(__dirname, '..', '..', 'downloads', '1.jpg');
        const status = await user.deleteOneAvatar('1');
        expect(existsSync(avatarFile)).toBeFalsy;
        expect(status).toEqual(404);
    });
});
