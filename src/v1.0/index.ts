import express from 'express'
import fs from 'fs'
if (!fs.existsSync('cache')) fs.mkdirSync('cache')

import { pingAsync, pingOnlineAsync } from "./ping"
import { serverIconAsync, playerIconAsync } from "./icon"

const router: express.Router = express.Router()

// --- Get Operational Status --------------------------------------------------
router.get('/api/status', (req: express.Request, res: express.Response) => {
    pingAsync()
        .then((json) => {
            res.send(json)
        }).catch((err) => {
            res.send(err)
        })
})
// -----------------------------------------------------------------------------


// --- Get Online Member -------------------------------------------------------
router.get('/api/status/online', (req: express.Request, res: express.Response) => {
    pingOnlineAsync()
        .then((json) => {
            res.send(json)
        }).catch((err) => {
            res.send(err)
        })
})
// -----------------------------------------------------------------------------


// --- Get Server Icon ---------------------------------------------------------
router.get('/api/icon', (req: express.Request, res: express.Response) => {
    serverIconAsync()
        .then((img) => {
            res.writeHead(200, {
                'Content-Type': 'image/png; charset=utf-8',
                'Content-Length': img.length
            })
            res.end(img, "binary")
        }).catch((err) => {
            res.send(err)
        })
})
// -----------------------------------------------------------------------------


// --- Get Player Icon ---------------------------------------------------------
router.get('/api/icon/:minecraftid', (req: express.Request, res: express.Response) => {
    playerIconAsync(req.params.minecraftid)
    .then((img) => {
        res.writeHead(200, {
            'Content-Type': 'image/png; charset=utf-8',
            'Content-Length': img.length
        })
        res.end(img, "binary")
        }).catch((err) => {
            res.send(err)
        })
})
// -----------------------------------------------------------------------------

module.exports = router
