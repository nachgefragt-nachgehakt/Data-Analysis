// neural network:
let inputLabels = [];

for(let i = 1; i <= partiesWithTotalValue[0].value.values.length; i++) inputLabels.push(`x${i}`);

// Helper function to transform 
function arrayToObject(array) {
    
    let dataMap = new Map();
    
    for(let i = 0; i < array.length; i++) {
        dataMap.set(`x${i+1}`, array[i]);
    }  
    
    return Object.fromEntries(dataMap);
}

// Sigmoid function
function sig(t) {
    return 1 / ( 1 + Math.pow(Math.E, -t));
}


let inputs = partiesWithTotalValue.map(party => arrayToObject(party.value.values));

const options = {
    task: 'classification',
    inputs: inputLabels,
    outputs: ['output'],
    debug: true,
    /*layers: [
        {
          type: 'dense',
          units: 88,
          activation: 'relu'
        },
        {
          type: 'dense',
          units: 24,
          activation: 'sigmoid'
        },
        {
          type: 'dense',
          units: 1,
          activation: 'sigmoid'
        }
      ]*/
  }

const nn = ml5.neuralNetwork(options);

inputs.forEach(
    (party, index) => {
        nn.addData(party, {output: partiesWithTotalValue[index].name});
    }
)

nn.normalizeData();

const trainingOptions = {
    epochs: 1024,
    batchSize: 36
}

/* Saved for later
const modelInfo = {
    model: 'trained_model/model.json',
    metadata: 'trained_model/model_meta.json',
    weights: 'trained_model/model.weights.bin',
};
nn.load(modelInfo, modelLoadedCallback);

function modelLoadedCallback() {}*/

nn.train(trainingOptions, finishedTraining);

function finishedTraining() {
    console.log('Training finished.');
}

function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
}

// Method to retrieve predictions as table and list
async function classifyWithTable(input) {
    let predictions = (await nn.classify(input, handleResults)).slice(0, 5).map(party => { return {label: party.label, confidence: party.confidence}});
    console.table(predictions);
    return predictions;
}

// Method for testing a single prediction
async function testSinglePrediction(input, expected) {
     return ((await nn.classify(input, handleResults)).slice(0, 1).map(party => { return {label: party.label, confidence: party.confidence}}).pop()).label == expected
}

// Method for testing the whole neural network
async function testNeuralNet() {
    let errors = 0;
    let errorParties = []
    for(let i = 0; i < inputs.length; i++) {  
        if(!await testSinglePrediction(inputs[i], partiesWithTotalValue[i].name)) {
            errors++;
            errorParties.push(partiesWithTotalValue[i].name);
        }
    }

    console.log(`${errors} errors while testing ${inputs.length} predictions.`);
    console.log(`The errors occured while trying to predict ${errorParties}`);
}

/* (Result for 256 epochs)
 * 4 errors while testing 36 predictions.
 * The errors occured while trying to predict Tierschutz-allianz,Tierschutz-partei,UNABHÄNGIGE,V-Partei³
 */
