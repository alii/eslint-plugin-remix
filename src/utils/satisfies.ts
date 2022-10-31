export const satisfies =
	<T>() =>
	<X extends T>(x: X) =>
		x;
