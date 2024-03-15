'use strict';

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    device1: DataTypes.STRING,
    device2: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidXNlciIsImRlZmluZSIsImZpcnN0TmFtZSIsIlNUUklORyIsImxhc3ROYW1lIiwiYWRkcmVzcyIsImVtYWlsIiwicGhvbmUiLCJyb2xlIiwidmVyaWZ5IiwiQk9PTEVBTiIsInBhc3N3b3JkIiwiZGV2aWNlMSIsImRldmljZTIiLCJhc3NvY2lhdGUiLCJtb2RlbHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3VzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoJ3VzZXInLCB7XG4gICAgZmlyc3ROYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGxhc3ROYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFkZHJlc3M6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcGhvbmU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcm9sZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICB2ZXJpZnk6IERhdGFUeXBlcy5CT09MRUFOLFxuICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGRldmljZTE6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZGV2aWNlMjogRGF0YVR5cGVzLlNUUklOR1xuICB9LCB7fSk7XG4gIHVzZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgfTtcbiAgcmV0dXJuIHVzZXI7XG59OyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFDWkEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBQ0MsU0FBUyxFQUFFQyxTQUFTLEVBQUs7RUFDekMsSUFBTUMsSUFBSSxHQUFHRixTQUFTLENBQUNHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDcENDLFNBQVMsRUFBRUgsU0FBUyxDQUFDSSxNQUFNO0lBQzNCQyxRQUFRLEVBQUVMLFNBQVMsQ0FBQ0ksTUFBTTtJQUMxQkUsT0FBTyxFQUFFTixTQUFTLENBQUNJLE1BQU07SUFDekJHLEtBQUssRUFBRVAsU0FBUyxDQUFDSSxNQUFNO0lBQ3ZCSSxLQUFLLEVBQUVSLFNBQVMsQ0FBQ0ksTUFBTTtJQUN2QkssSUFBSSxFQUFFVCxTQUFTLENBQUNJLE1BQU07SUFDdEJNLE1BQU0sRUFBRVYsU0FBUyxDQUFDVyxPQUFPO0lBQ3pCQyxRQUFRLEVBQUVaLFNBQVMsQ0FBQ0ksTUFBTTtJQUMxQlMsT0FBTyxFQUFFYixTQUFTLENBQUNJLE1BQU07SUFDekJVLE9BQU8sRUFBRWQsU0FBUyxDQUFDSTtFQUNyQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDTkgsSUFBSSxDQUFDYyxTQUFTLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBQ2hDO0VBQUEsQ0FDRDtFQUNELE9BQU9mLElBQUk7QUFDYixDQUFDIn0=