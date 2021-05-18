const errorCheck = require('./errorCheck');

const empty = "";
const moreThanN = 100;
const positiveNumber = 1;
const negativeNumber = -1;

test('error check', () => {
    expect(errorCheck(empty)).toBe("Your initial value must be atleast 0.");
    expect(errorCheck(moreThanN)).toBe(`Error. The sum of E<span class="sub">0</span>, I<span class="sub">0</span> and R<span class="sub">0</span> can't be more than the total population (N).`);
    expect(errorCheck(negativeNumber)).toBe(`Value can't be less than zero`);
    expect(errorCheck(positiveNumber)).toBe("");
});