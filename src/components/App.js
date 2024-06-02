import GameView from "./gamePig/GameView";
import gameStore from "./gamePig/GameStore";

function App() {
  return (
    <>
      <GameView
        gameState={gameStore}
      />
    </>
  );
}

export default App;
