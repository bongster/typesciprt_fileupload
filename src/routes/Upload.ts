
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED, CREATED } from 'http-status-codes';

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
        const apkFile: any = req.files?.apk_file;
        const jsonFile: any = req.files?.json_file;
        if (!(apkFile && jsonFile)) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        return res.status(CREATED).end();
    } catch (err) {
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
