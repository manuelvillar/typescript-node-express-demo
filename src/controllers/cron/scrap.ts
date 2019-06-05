/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import fs from 'fs';
import { logger } from '../../logger';

const API_URL = 'https://reqres.in/api/users/';

const CONFIG_FILE = '.scrapConfig.json';
const DATA_FILE = 'scrapData.json';

async function writeData(data: Record<string, any>[]): Promise<void> {
    fs.writeFile(
        DATA_FILE,
        JSON.stringify({ data }),
        'utf8',
        (err): Promise<void> => {
            return new Promise<void>(
                (resolve, reject): void => {
                    if (err) reject(err);
                    else resolve();
                },
            );
        },
    );
}

async function writeConfig(config: Record<string, any>): Promise<void> {
    fs.writeFile(
        CONFIG_FILE,
        JSON.stringify(config),
        'utf8',
        (err): Promise<void> => {
            return new Promise<void>(
                (resolve, reject): void => {
                    if (err) reject(err);
                    else resolve();
                },
            );
        },
    );
}

async function addData(dataFromApi: any): Promise<void> {
    fs.readFile(
        DATA_FILE,
        'utf8',
        async (err, data): Promise<void> => {
            if (err) {
                // first call
                writeData(dataFromApi);
            } else {
                const dataFromFile = JSON.parse(data);
                writeData([...dataFromFile.data, ...dataFromApi]);
            }
        },
    );
}

export default function scrap(): void {
    try {
        fs.readFile(
            CONFIG_FILE,
            'utf8',
            async (err, data): Promise<void> => {
                let config;
                let apiRes;
                if (err) {
                    // first try
                    const apiRes: Record<string, any> = await axios.get(`${API_URL}`);
                    const dataFromAPI = apiRes.data;
                    config = {
                        page: 1,
                        max: dataFromAPI.total_pages,
                    };
                } else {
                    config = JSON.parse(data);
                }
                if (config.page <= config.max) {
                    if (apiRes === undefined) apiRes = await axios.get(`${API_URL}?page=${config.page}`);
                    await addData(apiRes.data.data);
                    config.page = config.page + 1;
                    await writeConfig(config);
                }
            },
        );
    } catch (err) {
        logger.error(err);
    }
}
