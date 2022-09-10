const TEST_CONTAINER = document.querySelector("#test");

function test(actual, expected, name) {
    let passed = actual == expected
    return `${passed ? "✅" : "❌"} Test ${name} ${passed ? "PASSED" : "FAILED"}. ${actual} is${passed ? "" : " NOT"} equal to ${expected}`;
}

const TESTS = [
    test(function() {
        let vectorA = new Vector([1]);
        let vectorB = new Vector([1]);

        return vectorA.getTotalDifference(vectorB);
    }(), 0, "equality for length 1"),
    test(function() {
        let vectorA = new Vector([1]);
        let vectorB = new Vector([0]);

        return vectorA.getTotalDifference(vectorB);
    }(), 1, "difference for length 1"),
    test(function() {
        let vectorA = new Vector([1,1]);
        let vectorB = new Vector([0,0]);

        return vectorA.getTotalDifference(vectorB);
    }(), 2, "difference for length 2"),
    test(function() {
        let vectorA = new Vector(new Array(88).fill(1))
        let vectorB = new Vector(new Array(88).fill(0));

        return vectorA.getTotalDifference(vectorB);
    }(), 88, "difference for length 88"),
    test(function() {
        let vectorA = new Vector(new Array(88).fill(1))
        let vectorB = new Vector(new Array(88).fill(1));

        return vectorA.getTotalDifference(vectorB);
    }(), 0, "equality for length 88"),
    test(function() {
        let randomVectors = new Array(88).fill(0).map(() => Data.getRandomVector())
        let anotherRandomVector = Data.getRandomVector();
        return randomVectors.map(v => anotherRandomVector.equalTo(v)).includes(false);
    }(), true, "Data.getRandomVector() generates different vectors"),
    
];

TESTS.forEach(
    (test, index) => TEST_CONTAINER.insertAdjacentHTML("beforeend", `<div class="test-result">${TESTS[index]}</div>`)
)