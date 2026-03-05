import Board from "./components/Board"
import { GameProvider } from "./GameContext"

function App() {

  return (
    <GameProvider>
      <div style={{textAlign:"center", marginTop:"40px"}}>
        <h1>React Memory Game</h1>
        <Board/>
      </div>
    </GameProvider>
  )
}

export default App
