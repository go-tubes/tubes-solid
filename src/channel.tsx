import { Component, JSX, Accessor, createEffect, onCleanup, createSignal } from 'solid-js'
import { useTubes } from './provider';

export type SendFunc = (payload: any) => Promise<void>;

export const TubesChannel: Component<{ children?: (send: Accessor<SendFunc>) => JSX.Element, channel: string, onMessage?: (payload: any) => void }> = props => {
  const tubes = useTubes()
  const [send, setSend] = createSignal<SendFunc>((_: any) => Promise.reject("Tubes Client not found. Did you wrap TubesChannel in a TubesProvider?"))

  createEffect(() => {
    tubes?.subscribeChannel(props.channel, props.onMessage)
    const sendFunction: SendFunc = (payload: any) => tubes?.send(props.channel, { payload }) ?? Promise.reject("Tubes Client not found. Did you wrap TubesChannel in a TubesProvider?");
    setSend(() => sendFunction);
    
    onCleanup(() => {
      tubes?.unsubscribeChannel(props.channel, {});
    })
  })

  return (
    <>
      {props?.children?.(send)}
    </>
  )
}
