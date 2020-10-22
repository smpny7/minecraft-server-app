import express from 'express'
import { pingAsync } from "./ping"
import { playerIconAsync } from "./icon"

const jsend = require('jsend')
const router: express.Router = express.Router()

// --- Get Server Status -------------------------------------------------------
router.get('/getStatus', (req: express.Request, res: express.Response) => {
    if (req.body.address && req.body.port) {
        pingAsync(req.body.address, req.body.port)
            .then((data) => {
                res.json(
                    jsend.success({
                        status: data
                    })
                )
            })
            .catch(err => {
                res.status(500).json(
                    jsend.error("The server cannot be found.")
                )
            })
    } else {
        console.log('[ERROR] Incorrect request header.')
        res.status(403).json(
            jsend.error("Incorrect request header.")
        )
    }
})
// -----------------------------------------------------------------------------


// --- Get Player Icon ---------------------------------------------------------
router.get('/getPlayerIcon', (req: express.Request, res: express.Response) => {
    if (req.body.minecraftid) {
        playerIconAsync(req.body.minecraftid)
            .then((img) => {
                res.writeHead(200, {
                    'Content-Type': 'image/png; charset=utf-8',
                    'Content-Length': img.length
                })
                res.end(img, "binary")
            })
            .catch(err => {
                res.status(500).json(
                    jsend.error("The player cannot be found.")
                )
            })
    } else {
        console.log('[ERROR] Incorrect request header.')
        res.status(403).json(
            jsend.error("Incorrect request header.")
        )
    }
})
// -----------------------------------------------------------------------------

module.exports = router
