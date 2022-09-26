
/**
 * @description: 商品货品基本信息
 */
export interface pickingInfo {


    id:number;
    customer_id:number;
    batch_number:string;
    barcode:string | number;
    quantity:number;
    admin_id:string;
    good_id:string;
    created_at:string;
    updated_at:string;
    deleted_at?:string;
    labels?:any[];



}
