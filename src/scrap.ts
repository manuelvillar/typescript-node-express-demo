import * as cron from 'cron';
import scrap from './controllers/cron/scrap';

var CronJob = cron.CronJob;
new CronJob(
    '1 * * * * *',
    (): void => {
        console.log("I'll try to scrap every minute");
        scrap();
    },
    'null',
    true,
    'Europe/Madrid',
);
