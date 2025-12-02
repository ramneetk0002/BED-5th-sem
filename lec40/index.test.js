// let jest=require("jest");
const sum=jest.fn();// function mocking -- it creates a new function
//sum.mockReturnValue(5);
sum.mockReturnValueOnce(5);
test("addition 2 and 3 is 5", () => {
  expect(sum(4,5)).toBe(5);
})

test("addition 6 and 3 is 5", () => {
  sum.mockReturnValueOnce(9);
  expect(sum(4,5)).toBe(9);
})