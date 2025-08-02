export interface User {
    "id": number,
    "name": string,
    "username"?: string,
    "email": string,
    "address"?: {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": number,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone"?: number,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase"?: string,
        "bs"?: string
    }
}

export interface UserFormData {
    id?: number;
    name: string;
    email: string;
    website: string;
    companyName: string;
}
