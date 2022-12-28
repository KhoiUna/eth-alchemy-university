class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
  }
  execute() {
    for (let i of this.inputUTXOs) {
      if (i.spent) throw new Error("Double spending:", i);
    }

    let sumInput = 0;
    this.inputUTXOs.forEach((i) => (sumInput += i.amount));

    let sumOutput = 0;
    this.outputUTXOs.forEach((i) => (sumOutput += i.amount));

    if (sumInput < sumOutput) throw new Error("Input is less than output");

    this.inputUTXOs = this.inputUTXOs.map((i) => (i.spent = true));

    if (sumInput < 0) throw new Error("");
    const fee = sumInput - sumOutput;
    this.fee = fee;
  }
}

module.exports = Transaction;
