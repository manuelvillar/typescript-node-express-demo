/* eslint-disable @typescript-eslint/camelcase */

import axios from 'axios';
import path from 'path';
import fs from 'fs';

import scrap from '../../../controllers/cron/scrap';
import { logger } from '../../../logger';

const scrapConfig = path.resolve(__dirname, '..', '..', '..', '..', '.scrapConfig.json');
const scrapData = path.resolve(__dirname, '..', '..', '..', '..', 'scrapData.json');

beforeAll(
    (): void => {
        try {
            if (fs.existsSync(scrapConfig)) fs.unlinkSync(scrapConfig);
            if (fs.existsSync(scrapData)) fs.unlinkSync(scrapData);
        } catch (e) {
            logger.warn(e);
        }
    },
);

describe('controllers/cron/scrap', (): void => {
    it('should create config and data files', async (): Promise<void> => {
        const userData = {
            page: 1,
            per_page: 3,
            total: 12,
            total_pages: 4,
            data: [
                {
                    id: 1,
                    email: 'george.blu@reqres.in',
                    first_name: 'George',
                    last_name: 'Bluth',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
                },
                {
                    id: 2,
                    email: 'janet.weaver@reqres.in',
                    first_name: 'Janet',
                    last_name: 'Weaver',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
                },
                {
                    id: 3,
                    email: 'emma.wong@reqres.in',
                    first_name: 'Emma',
                    last_name: 'Wong',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg',
                },
            ],
        };
        const apiRes = {
            data: userData,
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' },
            config: {},
        };

        axios.get = jest.fn().mockReturnValue(apiRes);

        await scrap();
        expect(fs.existsSync(scrapData)).toBeTruthy;
        expect(fs.existsSync(scrapConfig)).toBeTruthy;
    });
});
