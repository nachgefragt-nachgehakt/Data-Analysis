class Vector {

    constructor(values) {
        this.values = values;
    }

    getDimension = () => this.values.length;

    getValues = () => this.values;

    getTotalDifference(anotherVector) {
        let diff = 0;
        this.values.forEach((e,i) => { return (this.values[i] != anotherVector.values[i]) ? diff++ : diff = diff; })
        return diff;
    }

    getParticipation = () => this.getTotalDifference(new Vector(new Array(this.values.length).fill(0)));

    // finding the right metric to form the party landscape (left, center, right)
    getParticipationFactor = () => this.getParticipation() / this.values.length;
}