import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';
import { UserDao } from '@daos';
import { paramMissingError, logger, adminMW } from '@shared';
import { UserRoles } from '@entities';
import bcrypt from 'bcrypt';

// Init shared
const router = Router();
const userDao = new UserDao();


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    try {
        // Check parameters
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        const {password, password_confirm, ...re_user } = user;
        // Add new user
        re_user.role = UserRoles.Admin;
        re_user.pwdHash = await bcrypt.hash(password, 10);
        await userDao.add(re_user);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
