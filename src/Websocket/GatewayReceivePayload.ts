import {
    GatewayHello,
    GatewayHeartbeat,
    GatewayDispatchPayload,
    GatewayInvalidSession,
    GatewayReconnect,
    GatewayHeartbeatAck,
    GatewayDispatchEvents,
} from "https://deno.land/x/discord_api_types@0.33.0/v10.ts";

import { HeartbeatRes, Identify, Resume } from './GatewaySendPayload.ts'

export function Hello(socket: WebSocket, {s, d}: GatewayHello, bot: any) {
    const jitter = Math.random()
    const ms = Math.floor(d.heartbeat_interval * jitter)
    setInterval(() => {
        HeartbeatRes(socket, s)
    }, ms)
    Identify(socket, bot.general.token!, 513)
}

export function Heartbeat(socket: WebSocket, {}: GatewayHeartbeat, _bot: any) {
    HeartbeatRes(socket, null)
}

let seq: number;
let session_id: string;

export function Dispatch(_socket: WebSocket, {s, t, d}: GatewayDispatchPayload, bot: any) {
    seq = s
    if (t == GatewayDispatchEvents.Ready) session_id = d.session_id;
}

export function GatewayInvalidSession(socket: WebSocket, {d}: GatewayInvalidSession, bot: any) {
    if (d) Resume(socket, bot.general.token!, session_id, seq);
}

export function Reconnect(socket: WebSocket, {}: GatewayReconnect, bot: any) {
    Resume(socket, bot.general.token!, session_id, seq)
}

export function HeartbeatAck(_socket: WebSocket, {}: GatewayHeartbeatAck, _bot: any) {
    console.log("ACK")
}
