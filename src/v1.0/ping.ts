const mc_ping = require('mc-ping-updated')

export function pingAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        mc_ping("jokura-vanila.work", 25565, function (err: any, res: any) {
            if (err)
                reject('stop')
            else
                resolve(res)
        })
    })
}

export function pingOnlineAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        mc_ping("jokura-vanila.work", 25565, function (err: any, res: any) {
            if (err)
                reject('stop')
            else if (res.players.sample)
                resolve(res.players.sample)
            else
                resolve('nobody')
        })
    })
}
