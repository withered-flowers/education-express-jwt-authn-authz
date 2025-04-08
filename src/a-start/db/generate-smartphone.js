const fs = require("node:fs/promises");
const { faker } = require("@faker-js/faker");

(async () => {
	const smartphone = [];

	for (let i = 0; i < 50; i++) {
		smartphone.push({
			name: faker.commerce.product(),
			price: faker.datatype.number(),
			qty: faker.datatype.number(),
			UserId: faker.datatype.number({
				min: 1,
				max: 5,
			}),
		});
	}

	await fs.writeFile("./smartphone.json", JSON.stringify(smartphone, null, 2), {
		encoding: "utf-8",
	});
})();
