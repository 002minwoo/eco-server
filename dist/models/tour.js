'use strict';

module.exports = function (sequelize, DataTypes) {
  var tour = sequelize.define('tour', {
    name: DataTypes.STRING,
    tour_id: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING,
    departure: DataTypes.INTEGER,
    departureText: DataTypes.STRING,
    destination: DataTypes.INTEGER,
    destinationText: DataTypes.STRING,
    discountPer: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    sortDesc: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    time_created: DataTypes.STRING,
    type: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    kindof: DataTypes.INTEGER
  }, {});
  return tour;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidG91ciIsImRlZmluZSIsIm5hbWUiLCJTVFJJTkciLCJ0b3VyX2lkIiwic2x1ZyIsInN0YXR1cyIsImRlcGFydHVyZSIsIklOVEVHRVIiLCJkZXBhcnR1cmVUZXh0IiwiZGVzdGluYXRpb24iLCJkZXN0aW5hdGlvblRleHQiLCJkaXNjb3VudFBlciIsImRpc2NvdW50IiwicGhvdG8iLCJzb3J0RGVzYyIsIlRFWFQiLCJkZXNjIiwidGltZV9jcmVhdGVkIiwidHlwZSIsImNvbnRlbnQiLCJwcmljZSIsImtpbmRvZiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdG91ci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCB0b3VyID0gc2VxdWVsaXplLmRlZmluZSgndG91cicsIHtcbiAgICBuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHRvdXJfaWQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgc2x1ZzogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzdGF0dXM6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGVwYXJ0dXJlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBkZXBhcnR1cmVUZXh0OiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRlc3RpbmF0aW9uOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBkZXN0aW5hdGlvblRleHQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGlzY291bnRQZXI6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIGRpc2NvdW50OiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwaG90bzogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzb3J0RGVzYzogRGF0YVR5cGVzLlRFWFQsXG4gICAgZGVzYzogRGF0YVR5cGVzLlRFWFQsXG4gICAgdGltZV9jcmVhdGVkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIGNvbnRlbnQ6IERhdGFUeXBlcy5URVhULFxuICAgIHByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBraW5kb2Y6IERhdGFUeXBlcy5JTlRFR0VSXG4gIH0sIHt9KTtcbiAgcmV0dXJuIHRvdXI7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsSUFBSSxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDcENDLElBQUksRUFBRUgsU0FBUyxDQUFDSSxNQUFNO0lBQ3RCQyxPQUFPLEVBQUVMLFNBQVMsQ0FBQ0ksTUFBTTtJQUN6QkUsSUFBSSxFQUFFTixTQUFTLENBQUNJLE1BQU07SUFDdEJHLE1BQU0sRUFBRVAsU0FBUyxDQUFDSSxNQUFNO0lBQ3hCSSxTQUFTLEVBQUVSLFNBQVMsQ0FBQ1MsT0FBTztJQUM1QkMsYUFBYSxFQUFFVixTQUFTLENBQUNJLE1BQU07SUFDL0JPLFdBQVcsRUFBRVgsU0FBUyxDQUFDUyxPQUFPO0lBQzlCRyxlQUFlLEVBQUVaLFNBQVMsQ0FBQ0ksTUFBTTtJQUNqQ1MsV0FBVyxFQUFFYixTQUFTLENBQUNTLE9BQU87SUFDOUJLLFFBQVEsRUFBRWQsU0FBUyxDQUFDUyxPQUFPO0lBQzNCTSxLQUFLLEVBQUVmLFNBQVMsQ0FBQ0ksTUFBTTtJQUN2QlksUUFBUSxFQUFFaEIsU0FBUyxDQUFDaUIsSUFBSTtJQUN4QkMsSUFBSSxFQUFFbEIsU0FBUyxDQUFDaUIsSUFBSTtJQUNwQkUsWUFBWSxFQUFFbkIsU0FBUyxDQUFDSSxNQUFNO0lBQzlCZ0IsSUFBSSxFQUFFcEIsU0FBUyxDQUFDUyxPQUFPO0lBQ3ZCWSxPQUFPLEVBQUVyQixTQUFTLENBQUNpQixJQUFJO0lBQ3ZCSyxLQUFLLEVBQUV0QixTQUFTLENBQUNTLE9BQU87SUFDeEJjLE1BQU0sRUFBRXZCLFNBQVMsQ0FBQ1M7RUFDcEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ04sT0FBT1IsSUFBSTtBQUNiLENBQUMifQ==