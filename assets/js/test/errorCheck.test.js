const errorCheck = require('./errorCheck');

const   empty = "",
        moreThanN = 100,
        positiveNumber = 1,
        negativeNumber = -1;

test('error check', () => {
    expect(errorCheck(empty)).toBe("Your initial value must be atleast 0.");
    expect(errorCheck(moreThanN)).toBe(`Error. The sum of E<span class="sub">0</span>, I<span class="sub">0</span> and R<span class="sub">0</span> can not be more than the total population (N).`);
    expect(errorCheck(negativeNumber)).toBe(`Value can not be less than zero`);
    expect(errorCheck(positiveNumber)).toBe("");
});