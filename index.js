const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}
  
function pAequorFactory (specimenNum, dna) {
    return {
        specimenNum,
        dna,
        mutate() {
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            let newBase = returnRandBase();
            while (this.dna[randomIndex] === newBase) {
                newBase = returnRandBase()
            }
            this.dna[randomIndex] = newBase
            return this.dna
        },

        compareDNA(nextSpecimen) {
            const similarity = this.dna.reduce((acc, cur, ind, arr) => {
                if (arr[ind] === nextSpecimen.dna[ind]) {
                  return  acc + 1;
                } else {
                   return acc;
                } 
            }, 0);
            const sharedDNA = (similarity / this.dna.length) * 100;
            const sharedDNA2 = sharedDNA.toFixed(2);
            console.log(`${this.specimenNum} and ${nextSpecimen.specimenNum} have ${sharedDNA2}% in common.`)
        },

        willLikelySurvive() {
            const total = this.dna.filter(base => base === "C" || base === "G");
            return (total.length / this.dna.length) >= .6
        },
    }
}

pAequorList = [];
idCounter = 1;
while (pAequorList.length < 30) {
    let newOrg = pAequorFactory(idCounter, mockUpStrand());
    if (newOrg.willLikelySurvive()) {
        pAequorList.push(newOrg);
    }
    idCounter++;
}


console.log(pAequorFactory(organism1, mockUpStrand()));