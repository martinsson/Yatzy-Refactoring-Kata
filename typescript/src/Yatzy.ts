
export class Yatzy {
    private dice: number[];

    constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
        // lets limit the number of dice by enumerating them.
        this.dice = [d1, d2, d3, d4, d5];
    }

    static chance(...dice: number[]): number {
        return sum(dice);
    }

    static yatzy(...args: number[]): number {
        return Math.min(...args) === Math.max(...args)? 50: 0
    }

    static ones(...dice: number[]): number {
        return this.sumOfDiceOfNumber(1, dice)
    }

    static twos(...dice: number[]): number {
        return this.sumOfDiceOfNumber(2, dice)
    }

    static threes(...dice: number[]): number {
        return this.sumOfDiceOfNumber(3, dice)
    }

    private static sumOfDiceOfNumber(number: number, dice: number[]) {
        return sum(dice.filter(d => d === number))
    }

    static score_pair(...dice: number[]): number {
        let pairScores = this.pairScores(dice, 2)
        return Math.max(...pairScores)
    }

    static two_pair(...dice: number[]): number {
        let pairScores = this.pairScores(dice, 2)
        return sum(pairScores)
    }

    static four_of_a_kind(...dice: number[]): number {
        return sum(this.pairScores(dice, 4))
    }

    static three_of_a_kind(...dice: number[]): number {
        return sum(this.pairScores(dice, 3))
    }

    static smallStraight(...dice: number[]): number {
        return haveSameValues(dice.sort(), [1, 2, 3, 4, 5]) ? 15 : 0
    }

    static largeStraight(...dice: number[]): number {
        return haveSameValues(dice.sort(), [2, 3, 4, 5, 6]) ? 20 : 0
    }


    fours(): number {
        return frequencies(this.dice)["4"] * 4
    }

    fives(): number {
        return frequencies(this.dice)["5"] * 5
    }

    sixes(): number {
        return frequencies(this.dice)["6"] * 6
    }


    private static pairScores(dice: number[], nbOfSameDiceNeeded: number) {
        let freq: { [key: number]: number } = frequencies(dice)
        let pairs: [string, number][] = Object.entries(freq).filter(([n, freq]) => freq >= nbOfSameDiceNeeded)
        return pairs.map(([n, freq]) => parseInt(n) * nbOfSameDiceNeeded)
    }

    static fullHouse(...dice: number[]): number {
        let groupsOfDice = groupBySame(dice)
        let threeOfAKind = groupsOfDice.find(rollsOfSameNumber => rollsOfSameNumber.length === 3)
        let pair = groupsOfDice.find(rollsOfSameNumber => rollsOfSameNumber.length === 2)
        if (threeOfAKind && pair) {
            return sum(threeOfAKind) + sum(pair)
        }
        return 0

    }
}

export function frequencies(dice: number[]): {[die:string]: number} {
    return dice.reduce((acc: any, die: number) => {
        acc[die]++
        return acc
    }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
}

export function groupBySame(dice: number[]): number[][] {
    let mapOfDice = dice.reduce((acc: any, die: number) => {
        acc[die] ? acc[die].push(die) : acc[die] = [die]
        return acc
    }, {})
    return Object.values(mapOfDice)
}

function sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

function haveSameValues(a: any[], b: any[]) {
    return a.toString() === b.toString()
}
