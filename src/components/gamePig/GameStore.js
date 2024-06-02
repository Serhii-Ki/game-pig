import { makeObservable, observable, action, reaction, when, autorun } from "mobx";

class GameStore {
    dicePoints = 0;
    onePlayerPoints = 0;
    twoPlayerPoints = 0;
    currentOnePlayerPoints = 0;
    currentTwoPlayerPoints = 0;
    activePlayer = true;
    isWinner = false;
    isActiveMethod = true;

    constructor() {
        makeObservable(this, {
            dicePoints: observable,
            onePlayerPoints: observable,
            twoPlayerPoints: observable,
            currentOnePlayerPoints: observable,
            currentTwoPlayerPoints: observable,
            activePlayer: observable,
            isWinner: observable,
            rollDice: action,
            savePoints: action,
            resetGame: action
        });

        autorun(() => {
            if (this.onePlayerPoints >= 20 || this.twoPlayerPoints >= 20) {
                this.isWinner = true;
                this.isActiveMethod = false;
            }

        });


        // when(
        //     () => this.onePlayerPoints >= 20 || this.twoPlayerPoints >= 20,
        //     () => {
        //         this.isWinner = true;
        //         this.isActiveMethod = false;
        //     }
        // );

        // const gameFinish = reaction(() => this.isWinner,
        //     (isWinner) => {
        //         if (isWinner) {
        //             this.isActiveMethod = false;
        //             gameFinish();
        //         }
        //     });
    }

    changePlayer() {
        this.activePlayer = !this.activePlayer;
        this.currentOnePlayerPoints = 0;
        this.currentTwoPlayerPoints = 0;
    };


    rollDice() {
        if (this.isActiveMethod) {
            this.dicePoints = Math.floor(Math.random() * 6) + 1;

            if (this.activePlayer) this.currentOnePlayerPoints += this.dicePoints;
            else this.currentTwoPlayerPoints += this.dicePoints;

            if (this.dicePoints === 1) {
                this.changePlayer();
            }
        }
    };

    savePoints() {
        if (this.isActiveMethod) {
            if (this.activePlayer) this.onePlayerPoints += this.currentOnePlayerPoints;
            else this.twoPlayerPoints += this.currentTwoPlayerPoints;

            this.changePlayer();
        }
    }

    resetGame() {
        this.dicePoints = 0;
        this.onePlayerPoints = 0;
        this.twoPlayerPoints = 0;
        this.currentOnePlayerPoints = 0;
        this.currentTwoPlayerPoints = 0;
        this.activePlayer = true;
        this.isWinner = false;
        this.isActiveMethod = true;
    }

}

const gameStore = new GameStore();

export default gameStore;