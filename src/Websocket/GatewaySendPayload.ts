import { 
    GatewaySendPayload,
    GatewayOpcodes
} from "https://deno.land/x/discord_api_types@0.33.0/v10.ts";

export function HeartbeatRes(socket: WebSocket, seq: number | null) {
    const payload: GatewaySendPayload = {
        op: GatewayOpcodes.Heartbeat,
        d: seq
    }
    socket.send(JSON.stringify(payload))
}

export function Identify(socket: WebSocket, token: string, intents: number) {
    const payload: GatewaySendPayload = {
        op: GatewayOpcodes.Identify,
        d: {
            token,
            intents,
            properties: {
              $os: "linux",
              $browser: "discord.json",
              $device: "discord.json"
            }
        }
    }
    socket.send(JSON.stringify(payload))
}

export function PresenceUpdate(socket: WebSocket) {

}

export function VoiceStateUpdate(socket: WebSocket) {

}

export function Resume(socket: WebSocket, token: string, session_id: string, seq: number) {
    const payload: GatewaySendPayload = {
        op: GatewayOpcodes.Resume,
        d: {
            token,
            session_id,
            seq
        }
    }
    socket.send(JSON.stringify(payload))
}

export function RequestGuildMembers(socket: WebSocket) {

}