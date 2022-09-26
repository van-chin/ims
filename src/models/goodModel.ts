
/**
 * @description: 商品货品基本信息
 */
export interface goodInfo {
    id:number;
    name:string;
    barcode:string | number;
    brand:string;
    manufacturer:string;
    specification:string;
    price:number;
    supplier_id:number;
    unit:string;

    status:boolean | number;
    first_pinyin:string;
    pinyin:string;
    stock:string;
    unspsc:string;
    gross_weight:string;

    net_weight:string;
    description:string;
    hygienic_license:string;
    net_content:string;
    options:object;
    cover:string;
    category_id:number;

}
