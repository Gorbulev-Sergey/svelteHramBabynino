import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	client_email: { public: false },
	private_key: { public: false },
	project_id: { public: false },
	databaseURL: { public: false }
});
