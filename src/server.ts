import { logger } from './logger';
import app from './app';

const server = app.listen(
    app.get('port'),
    (): void => {
        logger.info('App is running on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    },
);

export default server;
