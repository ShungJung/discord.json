import { 
    GatewayReceivePayload,
    GatewayOpcodes
} from "https://deno.land/x/discord_api_types@0.33.0/v10.ts";

import bot from '../../bot.json' assert { type: 'json' } 
import { DiscordRequest } from '../utils.ts';

const v = "&v=9"
const encoding = "&encoding=json"

const urlRes = await DiscordRequest(bot.general.token, "/gateway/bot", { method: "GET" })
const urlJson = await urlRes.json()
const url: string = urlJson.url + "/" + v + encoding

const socket: WebSocket = new WebSocket(url)

socket.onopen = (ev) => {
    console.log(ev.type)
}

socket.onmessage = async (m) => {
    const payload: GatewayReceivePayload = JSON.parse(m.data)

    const data = await import(`./GatewayReceivePayload.ts`)
    const module = data[GatewayOpcodes[payload.op]]
    console.log(payload.op)
    module(socket, payload, bot)
}

socket.onclose = (ev) => {
    console.log(ev.type)
}