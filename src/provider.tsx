import { TubesClient, TubesClientConfig } from '@go-tubes/tubes-js';
import { Component, createContext, useContext, ParentProps } from 'solid-js'

const TubesContext = createContext<TubesClient>();

export function createTubesClient(config: TubesClientConfig): TubesClient {
  return new TubesClient(config)
}

export const TubesProvider: Component<ParentProps & { config: TubesClientConfig }> = props => {
  const client = createTubesClient(props.config)

  return (
    <TubesContext.Provider value={client}>
      {props.children}
    </TubesContext.Provider>
  )
}

export function useTubes() { return useContext<TubesClient|undefined>(TubesContext); }
