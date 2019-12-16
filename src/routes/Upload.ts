
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';

import {
    paramMissingError,
    logger,
    adminMW,
} from '@shared';


/******************************************************************************
 *                      Upload File - "POST /api/upload"
 ******************************************************************************/

const router = Router();

router.post('/', adminMW, async (req: Request, res: Response) => {
    try {
        const files: any = req;
        logger.info(files);
        const apkFile: any = req.files?.apk_file;
        logger.info(apkFile);
        const jsonFile: any = req.files?.json_file;
        logger.info(jsonFile?.name);
        if (!(apkFile && jsonFile)) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        };
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;