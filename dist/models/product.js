'use strict';

module.exports = function (sequelize, DataTypes) {
  var product = sequelize.define('product', {
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    childCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    brand: DataTypes.STRING,
    unitSize: DataTypes.STRING,
    status: DataTypes.STRING,
    buyerPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    netPrice: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    phoneNumber: DataTypes.TEXT,
    square: DataTypes.FLOAT,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    provinceText: DataTypes.STRING,
    districtText: DataTypes.STRING,
    wardText: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    typeRoom: DataTypes.STRING,
    interior: DataTypes.STRING,
    endow: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_manager: {
      type: DataTypes.INTEGER
    },
    rent: {
      type: DataTypes.BOOLEAN
    },
    author_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  product.associate = function (models) {
    // associations can be defined here
    models.product.belongsTo(models.SubCategory, {
      foreignKey: 'subCategoryId'
    });
    models.product.hasMany(models.productphoto, {
      foreignKey: 'productId'
    });
    models.product.belongsTo(models.SubChildCategory, {
      foreignKey: 'childCategoryId'
    });
    models.product.hasMany(models.vendor_product, {
      foreignKey: 'productId'
    });
    models.product.belongsTo(models.user, {
      foreignKey: 'user_manager'
    });
  };
  return product;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwicHJvZHVjdCIsImRlZmluZSIsImNhdGVnb3J5SWQiLCJJTlRFR0VSIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJTVFJJTkciLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInN0YXR1cyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50UGVyIiwiZGlzY291bnQiLCJ0b3RhbCIsIm5ldFByaWNlIiwicGhvdG8iLCJzb3J0RGVzYyIsIlRFWFQiLCJkZXNjIiwicGhvbmVOdW1iZXIiLCJzcXVhcmUiLCJGTE9BVCIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidHlwZSIsImFsbG93TnVsbCIsInVzZXJfbWFuYWdlciIsInJlbnQiLCJCT09MRUFOIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsImFzc29jaWF0ZSIsIm1vZGVscyIsImJlbG9uZ3NUbyIsIlN1YkNhdGVnb3J5IiwiZm9yZWlnbktleSIsImhhc01hbnkiLCJwcm9kdWN0cGhvdG8iLCJTdWJDaGlsZENhdGVnb3J5IiwidmVuZG9yX3Byb2R1Y3QiLCJ1c2VyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9wcm9kdWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSA9PiB7XG4gIGNvbnN0IHByb2R1Y3QgPSBzZXF1ZWxpemUuZGVmaW5lKCdwcm9kdWN0Jywge1xuICAgIGNhdGVnb3J5SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHN1YkNhdGVnb3J5SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIGNoaWxkQ2F0ZWdvcnlJZDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgbmFtZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzbHVnOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGJyYW5kOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHVuaXRTaXplOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHN0YXR1czogRGF0YVR5cGVzLlNUUklORyxcbiAgICBidXllclByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcXR5OiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBkaXNjb3VudFBlcjogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgZGlzY291bnQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHRvdGFsOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBuZXRQcmljZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgcGhvdG86IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgc29ydERlc2M6IERhdGFUeXBlcy5URVhULFxuICAgIGRlc2M6IERhdGFUeXBlcy5URVhULFxuICAgIHBob25lTnVtYmVyOiBEYXRhVHlwZXMuVEVYVCxcbiAgICBzcXVhcmU6IERhdGFUeXBlcy5GTE9BVCxcbiAgICBwcm92aW5jZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBkaXN0cmljdDogRGF0YVR5cGVzLlNUUklORyxcbiAgICB3YXJkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHByb3ZpbmNlVGV4dDogRGF0YVR5cGVzLlNUUklORyxcbiAgICBkaXN0cmljdFRleHQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgd2FyZFRleHQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgYnVkZ2V0OiBEYXRhVHlwZXMuRkxPQVQsXG4gICAgdHlwZVJvb206IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgaW50ZXJpb3I6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZW5kb3c6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHJhdGluZzogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgbm90ZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXG4gICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9LFxuICAgIHVzZXJfbWFuYWdlcjoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgfSxcbiAgICByZW50OiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZXMuQk9PTEVBTixcbiAgICB9LFxuICAgIGF1dGhvcl9waG9uZToge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICAgIGFsbG93TnVsbDogdHJ1ZVxuICAgIH0sXG4gICAgYWRkcmVzczoge1xuICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXG4gICAgICBhbGxvd051bGw6IHRydWVcbiAgICB9XG4gIH0sIHt9KTtcblxuICBwcm9kdWN0LmFzc29jaWF0ZSA9IGZ1bmN0aW9uIChtb2RlbHMpIHtcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxuICAgIG1vZGVscy5wcm9kdWN0LmJlbG9uZ3NUbyhtb2RlbHMuU3ViQ2F0ZWdvcnksIHsgZm9yZWlnbktleTogJ3N1YkNhdGVnb3J5SWQnIH0pO1xuICAgIG1vZGVscy5wcm9kdWN0Lmhhc01hbnkobW9kZWxzLnByb2R1Y3RwaG90bywgeyBmb3JlaWduS2V5OiAncHJvZHVjdElkJyB9KTtcbiAgICBtb2RlbHMucHJvZHVjdC5iZWxvbmdzVG8obW9kZWxzLlN1YkNoaWxkQ2F0ZWdvcnksIHsgZm9yZWlnbktleTogJ2NoaWxkQ2F0ZWdvcnlJZCcgfSk7XG4gICAgbW9kZWxzLnByb2R1Y3QuaGFzTWFueShtb2RlbHMudmVuZG9yX3Byb2R1Y3QsIHsgZm9yZWlnbktleTogJ3Byb2R1Y3RJZCcgfSk7XG4gICAgbW9kZWxzLnByb2R1Y3QuYmVsb25nc1RvKG1vZGVscy51c2VyLCB7IGZvcmVpZ25LZXk6ICd1c2VyX21hbmFnZXInIH0pO1xuICB9O1xu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