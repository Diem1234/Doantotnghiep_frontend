const url = "/menu/foodDetail/45cbc4a0e4123f6920000002";
const pattern = /^\/menu\/foodDetail\/([a-f0-9]{24})$/;
const match = pattern.test(url);
console.log(match); // Output: true
