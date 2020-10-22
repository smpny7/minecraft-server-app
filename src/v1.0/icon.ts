import axios from 'axios'
import fs from 'fs'

const sharp = require('sharp')

export function playerIconAsync(minecraftid: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync("./cache/" + minecraftid + ".png")) {
            const image = fs.readFileSync("./cache/" + minecraftid + ".png", "binary")
            resolve(image)
        }

        const getUuidUrl = 'https://api.mojang.com/users/profiles/minecraft/' + minecraftid

        axios.get(getUuidUrl).then((res) => {
            if (!res.data.id)
                reject()
            const getUserData = 'https://sessionserver.mojang.com/session/minecraft/profile/' + res.data.id
            axios.get(getUserData).then((res) => {
                const decode: string = Buffer.from(res.data.properties[0].value, 'base64').toString()
                const getIconUrl = JSON.parse(decode).textures.SKIN.url

                Promise.all([trimming(minecraftid, getIconUrl)]).then(function () {
                    const image = fs.readFileSync("./cache/" + minecraftid + ".png", "binary")
                    resolve(image)
                })
            })
        })
    })
}

async function trimming(minecraftid: string, getIconUrl: string) {
    const input = (await axios({ url: getIconUrl, responseType: "arraybuffer" })).data as Buffer

    await sharp(input)
        .extract({ width: 8, height: 8, left: 8, top: 8 })
        .toFile("./cache/" + minecraftid + ".png")
    return
}
