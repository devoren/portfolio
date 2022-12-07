/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_REACT_APP_MAILCHIMP_URL: string;
	readonly VITE_REACT_APP_MAILCHIMP_U: string;
	readonly VITE_REACT_APP_MAILCHIMP_ID: string;
	readonly VITE_REACT_APP_AUTH_UID: string;
	readonly VITE_REACT_APP_CONTACT_SENDER_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
