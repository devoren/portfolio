import "./styles.css";

import { addDoc, collection } from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo } from "src/assets/img";
import Loader from "src/components/Loader";
import { firestore, storage } from "src/firebase.config";
import { IProject } from "src/model";

const AddProject = () => {
	const [title, setTitle] = useState("");
	const [imageAsset, setImageAsset] = useState<string | null>(null);
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [isWeb, setIsWeb] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [progress, setProgress] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		const imageFile = e.target?.files && e.target?.files[0];
		const storageRef = ref(
			storage,
			`Images/${Date.now()}-${imageFile?.name}`
		);
		const uploadTask =
			imageFile && uploadBytesResumable(storageRef, imageFile);

		uploadTask?.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.log(error);
				setIsLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setIsLoading(false);
				});
			}
		);
	};

	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset as string);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
		});
	};

	const saveItem = async (data: IProject) => {
		await addDoc(collection(firestore, "Projects"), data);
	};

	const saveDetails = () => {
		setIsLoading(true);
		try {
			if (!title || !description || !imageAsset) {
				setIsLoading(false);
			} else {
				const data = {
					id: `${Date.now()}`,
					title,
					imgURL: imageAsset,
					description,
					isWeb,
					isMobile,
					link,
				};
				saveItem(data)
					.then(() => setIsLoading(false))
					.catch((e) => {
						console.log(e);
						setIsLoading(false);
					})
					.finally(() => setIsLoading(false));
				clearData();
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const clearData = () => {
		setTitle("");
		setLink("");
		setDescription("");
		setIsWeb(false);
		setIsMobile(false);
		setImageAsset(null);
	};

	return (
		<Container className="content">
			<Link className={"dashboard-brand"} to={"/"}>
				<img src={logo} alt="logo" />
			</Link>
			<div className="title">Add Project</div>
			<input
				type="text"
				placeholder="Title"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				required
				className="input"
			/>
			<input
				type="text"
				placeholder="Some link"
				onChange={(e) => setLink(e.target.value)}
				value={link}
				required
				className="input"
			/>
			<textarea
				rows={6}
				value={description}
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value)}
				className="input"
			/>
			<div className="align-items">
				<Form.Check
					type={"checkbox"}
					label={`Web`}
					checked={isWeb}
					onChange={() => setIsWeb((prev) => !prev)}
					className="checkbox"
					disabled={isMobile ? true : false}
				/>
				<Form.Check
					type={"checkbox"}
					label={`Mobile`}
					checked={isMobile}
					onChange={() => setIsMobile((prev) => !prev)}
					className="checkbox"
					disabled={isWeb ? true : false}
				/>
			</div>
			<div className="image-container">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{!imageAsset ? (
							<label className="label">
								<div>
									<p>Click here to upload</p>
								</div>
								<input
									type="file"
									name="uploadimage"
									accept="image/*"
									onChange={uploadImage}
									hidden
								/>
							</label>
						) : (
							<div className="image__uploaded__content">
								<img src={imageAsset} alt="uploaded image" />
								<button type="button" onClick={deleteImage}>
									Delete
								</button>
							</div>
						)}
					</>
				)}
			</div>

			<div className="save">
				<button type="button" onClick={saveDetails}>
					Add
				</button>
			</div>
		</Container>
	);
};

export default AddProject;
