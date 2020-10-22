const mc_ping = require('mc-ping-updated')

export function pingAsync(address: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
        mc_ping(address, port, function (err: any, res: any) {
            if (err)
                reject()
            else
                resolve(res)
        })
    })
}
