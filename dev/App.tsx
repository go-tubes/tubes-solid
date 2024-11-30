import type { Component } from 'solid-js'
import logo from './logo.svg'
import styles from './App.module.css'
import { TubesProvider, TubesChannel } from 'src'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <h1>
          Tubes Client
        </h1>
      </header>
      <TubesProvider config={{ url: "ws://localhost:8000/connect" }}>
        <TubesChannel channel="test"  />
      </TubesProvider>
    </div>
  )
}

export default App
