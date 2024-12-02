import { Component, JSX, Accessor, createEffect, onCleanup, createSignal } from 'solid-js'
import { useTubes } from './provider';

export type SendFunc = (payload: any) => Promise<void>;

const undefinedSendFunc: SendFunc = (_: any) => Promise.reject("Tubes Client not found. Did you wrap TubesChannel in a TubesProvider?")

export const TubesChannel: Component<{ children?: (payload: Accessor<any>, send: Accessor<SendFunc>) => JSX.Element, channel: string, onMessage?: (payload: any) => void }> = props => {
  const tubes = useTubes()
  const [send, setSend] = createSignal<SendFunc>(undefinedSendFunc)
  const [lastPayload, setLastPayload] = createSignal<any>(null)

  createEffect(() => {
    const onMessageHandler = (payload: any) => {
      if (props.onMessage) props.onMessage(payload);
      setLastPayload(payload);
    };
    tubes?.subscribeChannel(props.channel, onMessageHandler)
    const sendFunction: SendFunc = (payload: any) => tubes?.send(props.channel, { payload }) ?? undefinedSendFunc(payload);
    setSend(() => sendFunction);
    
    onCleanup(() => {
      tubes?.unregisterHandler(props.channel, onMessageHandler);
    })
  })

  return (
    <>
      {props?.children?.(send, lastPayload)}
    </>
  )
}
