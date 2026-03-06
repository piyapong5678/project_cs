export interface Card {
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