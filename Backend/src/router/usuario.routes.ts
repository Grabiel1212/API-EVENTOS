import { Router } from "express";



const router   = Router();

router.get('/',(res:any , req) =>{
 res.json({mensaje : 'lsita de de userio '});
});

export default router;