export interface Sent {
    id_send:          string;
    id_user:          string;
    id_address:       string;
    id_card:          string;
    status_send:      string;
    paymentModel:     PaymentModel;
    addressModel:     AddressModel;
    cardProductModel: CardProductModel[];
}

export interface AddressModel {
    id_address:          string;
    housenumber_address: string;
    village_address:     string;
    housename_address:   string;
    road_address:        string;
    subdistrict_address: string;
    district_address:    string;
    prefecture_address:  string;
    province_address:    string;
    postcode_address:    string;
    id_user:             string;
    firstname_address:   string;
    lastname_address:    string;
    phone_address:       string;
}

export interface CardProductModel {
    id_card:      string;
    id_product:   string;
    id_user:      string;
    number_card:  string;
    statuscard:   string;
    productModel: ProductModel;
}

export interface ProductModel {
    id_product:     string;
    name_product:   string;
    price_product:  string;
    detail_product: string;
    image_product:  string;
    type_product:   string;
    number_product: string;
}

export interface PaymentModel {
    id_payment:     string;
    total_payment:  string;
    image_payment:  null;
    status_payment: string;
    id_send:        string;
}