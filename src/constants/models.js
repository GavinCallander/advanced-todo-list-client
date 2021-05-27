const Field = {
    name: String,
    value: String
};

const ListItem = {
    name: {
        type: String,
        required: [true, 'name is required']
    },
    additionalFields: [Field]
};

// name: Milk
// additionalFields: [{size: 1 gallon}, {quantity: 1}]