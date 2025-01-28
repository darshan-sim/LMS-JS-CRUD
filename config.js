const config = {
    id: { type: "text", type: "number", hidden: true },
    name: { type: "text", placeholder: "Product Name", required: true, error: "Please enter name" },
    description: { type: "text", placeholder: "Product Name", required: false, error: "Please enter description" },
    price: { type: "number", placeholder: "900", required: true, error: "Please enter price" },
    // category: {type: "text", placeholder: "Product Name", required: true, error: "Please enter name"},
    tags: [],
    quantity: { type: "number", placeholder: "1", required: true, error: "Please enter quantity" },
    images: [],
    offer: { type: "number", placeholder: "10%", required: false, error: "Please enter name" },
    // startTime: "",
    // endTime: "",
}

export default config