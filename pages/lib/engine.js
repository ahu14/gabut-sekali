export default class Engine {
  constructor(stockfish) {
    this.stockfish = stockfish;
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
        callback({ bestMove });
      });
    };

    this.init();
  }

  init() {
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === "readyok") {
        this.isReady = true;
      }
    });
  }

  evaluatePosition(fen, depth) {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop() {
    this.sendMessage("stop");
  }
  
  quit() {
    this.sendMessage("quit"); 
  }
}