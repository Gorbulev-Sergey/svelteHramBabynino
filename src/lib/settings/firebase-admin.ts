import { client_email, private_key, project_id, databaseURL } from '$app/env/private';
import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

function initAdmin() {
	if (getApps().length > 0) return getApp();
	private_key;

	return initializeApp({
		credential: cert({
			projectId: project_id,
			clientEmail: client_email,
			privateKey: private_key
		}),
		databaseURL: databaseURL
	});
}

const app = initAdmin();

export const adminAuth = getAuth(app);
export const adminDb = getDatabase(app);
