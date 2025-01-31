const inputConfig = {
	id: { type: "hidden", hidden: true },
	name: {
		type: "text",
		placeholder: "Product Name",
		validations: {
			required: { value: true, message: "Please enter name" }
		}
	},
	description: {
		type: "text",
		placeholder: "Product description",
		validations: {
			required: { value: false, message: "Please enter description" }
		}
	},
	price: {
		type: "number",
		placeholder: "900",
		validations: {
			required: { value: true, message: "Please enter price" },
			min: { value: 1, message: "Minimum price should be 1" },
			max: { value: 3000, message: "Maximum price should be 3000" }
		}
	},
	images: {
		type: "file",
		validations: {
			required: { value: true, message: "Please upload an image" },
			fileType: {
				value: ["image/jpeg", "image/png"],
				message: "Only JPEG and PNG files are allowed"
			},
			fileSize: {
				value: 2 * 1024 * 1024,
				message: "File size should be less than 2MB"
			}
		}
	}
};

export { inputConfig };
