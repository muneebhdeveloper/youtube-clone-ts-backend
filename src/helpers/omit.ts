function omit<T>(obj: T, property: keyof T | (keyof T)[]) {}

export default omit;
