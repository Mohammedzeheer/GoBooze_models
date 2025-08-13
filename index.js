const addressModel = require("./address");
const adminModel = require("./admin");
const cartModel = require("./cart");
const cartItemModel = require("./cart_item");
const collectionModel = require("./category");
const subCollectionModel = require("./sub_collection");
const couponModel = require("./coupon");
const orderModel = require("./order");
const paymentMethodModel = require("./payment_method");
const productModel = require("./product");
const itemModel = require("./items");
const reviewModel = require("./review");
const searchHistoryModel = require("./search_history");
const storeModel = require("./store");
const productImageModel = require("./product_image");
const itemImageModel = require("./item_image");
const stockModel = require("./stock");
const variantModel = require("./variant");
const brandModel = require("./brands");
const customerModal = require("./customers");
const orderDelivery = require("./order_delivery");
const orderProducts = require("./order_products");
const orderStatus = require("./order_status");
const roleModel = require("./role");
const partnerModel = require("./partners");
const storeDeliveryPartner = require("./store_delivery_partner");
const favoriteModel = require("./favorite");
const orderTransactionModel = require("./order_transaction");
const inquiryModel = require("./inquiry")
const ContentManagementModel = require("./content_management")
const redeemCouponModel = require("./redeem_coupon")
const subscriptionModel = require("./subscription");
const loyaltySettingsModel = require("./LoyaltySettings");
const loyaltyPointsModel = require("./LoyaltyPoints");

module.exports = {
  addressModel,
  brandModel,
  adminModel,
  variantModel,
  cartModel,
  collectionModel,
  subCollectionModel,
  couponModel,
  orderModel,
  paymentMethodModel,
  productModel,
  reviewModel,
  searchHistoryModel,
  storeModel,
  productImageModel,
  stockModel,
  itemModel,
  itemImageModel,
  customerModal,
  orderStatus,
  orderDelivery,
  orderProducts,
  roleModel,
  partnerModel,
  storeDeliveryPartner,
  favoriteModel,
  cartItemModel,
  orderTransactionModel,
  inquiryModel,
  ContentManagementModel,
  redeemCouponModel,
  subscriptionModel,
  loyaltySettingsModel,
  loyaltyPointsModel
};
