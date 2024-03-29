export const constants = {
	expiresInToken: '4h',
	pwdMinLenght: 6,
	images: "../data/images",
}

// FASCE_ORARIE => ["10:00-11:00", "...", "19:00-20:00"]
const orari = { start: 10, end: 20, step: 1 }
export const FASCE_ORARIE = Array.from(
	{ length: orari.end - orari.start },
	(value, index: number) => `${index + orari.start}:00-${index + orari.start + orari.step}:00`
);
