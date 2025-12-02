const math=require('./math');
/**
 * {
 *  multiply,sub,modulo
 * }
 */
jest.mock("./math"); //module mocking
/**
 * {
 * multiply:jest.fn(),
 * sub:jest.fn(),
 * modulo:jest.fn()
 * }
 */

test("multiplication of 2 and 3 is 6", () => {
    math.multiply.mockReturnValueOnce(6);
    expect(math.multiply(2,3)).toBe(6);
})

test("subtraction of 5 and 3 is 2", () => {
    math.sub.mockReturnValueOnce(2);
    expect(math.sub(5,3)).toBe(2);
})

test("modulo of 5 and 2 is 1", () => {
    math.modulo.mockReturnValueOnce(1);
    expect(math.modulo(5,2)).toBe(1);
})