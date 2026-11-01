export async function load({ locals }) {
	// console.log('user: ', await locals.user);
	return {
		user: await locals.user
	};
}
