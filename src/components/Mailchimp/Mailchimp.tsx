import MailchimpSubscribe from "react-mailchimp-subscribe";

import Newsletter from "./Newsletter";

const env = import.meta.env;

const Mailchimp = () => {
	const postUrl = `${env.VITE_REACT_APP_MAILCHIMP_URL}?u=${env.VITE_REACT_APP_MAILCHIMP_U}&id=${env.VITE_REACT_APP_MAILCHIMP_ID}`;

	return (
		<>
			<MailchimpSubscribe
				url={postUrl}
				render={({ subscribe, status, message }) => (
					<Newsletter
						status={status}
						message={message}
						onValidated={(formData) => subscribe(formData)}
					/>
				)}
			/>
		</>
	);
};
export default Mailchimp;
