const product = (() => {
    let n = 100;
    const object = {
        name: "",
        description: "",
        price: "",
        // category: "",
        // tags: [],
        quantity: "",
        // images: [],
        offer: "",
        startTime: "",
        qua: ""
            // endTime: "",
    };

    // Function to populate a key-value pair into the product object
    const populateObject = (key, value) => {
        object[key] = value;
    };

    // Returning an object that exposes the createEmptyProduct function
    return {
        createEmptyProduct: () => { return {...object } },
        populateProduct: populateObject
    };
})()

export default product;