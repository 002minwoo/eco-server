"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /**
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work. 
   */
  connection: process.env.DB_CONNECTION || "mysql",
  /**
   * Here you may specify the host address of database which will be
   * used for connection
   */
  host: process.env.DB_HOST || "127.0.0.1",
  /**
   * Here you may specify the port of database which will be
   * used for connection
   */
  port: process.env.DB_PORT || 3306,
  /**
   * Here you may specify the database name of connection which will be
   * used for connection
   */
  database: process.env.DB_DATABASE || "forge",
  /**
   * Here you may specify the username of database which will be
   * used for connection
   */
  username: process.env.DB_USERNAME || "forge",
  /**
   * Here you may specify the password of database which will be
   * used for connection
   */
  password: process.env.DB_PASSWORD || ""
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb25uZWN0aW9uIiwicHJvY2VzcyIsImVudiIsIkRCX0NPTk5FQ1RJT04iLCJob3N0IiwiREJfSE9TVCIsInBvcnQiLCJEQl9QT1JUIiwiZGF0YWJhc2UiLCJEQl9EQVRBQkFTRSIsInVzZXJuYW1lIiwiREJfVVNFUk5BTUUiLCJwYXNzd29yZCIsIkRCX1BBU1NXT1JEIiwiZXhwb3J0cyIsIl9kZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB3aGljaCBvZiB0aGUgZGF0YWJhc2UgY29ubmVjdGlvbnMgYmVsb3cgeW91IHdpc2hcbiAgICAgKiB0byB1c2UgYXMgeW91ciBkZWZhdWx0IGNvbm5lY3Rpb24gZm9yIGFsbCBkYXRhYmFzZSB3b3JrLiBcbiAgICAgKi9cbiAgICBjb25uZWN0aW9uIDogcHJvY2Vzcy5lbnYuREJfQ09OTkVDVElPTiB8fCBcIm15c3FsXCIsXG5cblxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBob3N0IGFkZHJlc3Mgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBob3N0ICA6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgXCIxMjcuMC4wLjFcIixcblxuICAgIFxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBwb3J0IG9mIGRhdGFiYXNlIHdoaWNoIHdpbGwgYmVcbiAgICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAgICovXG4gICAgcG9ydCA6IHByb2Nlc3MuZW52LkRCX1BPUlQgfHwgMzMwNixcblxuXG4gICAgLyoqXG4gICAgICogSGVyZSB5b3UgbWF5IHNwZWNpZnkgdGhlIGRhdGFiYXNlIG5hbWUgb2YgY29ubmVjdGlvbiB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIGRhdGFiYXNlICA6IHByb2Nlc3MuZW52LkRCX0RBVEFCQVNFIHx8IFwiZm9yZ2VcIixcblxuICAgIFxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSB1c2VybmFtZSBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIHVzZXJuYW1lIDogcHJvY2Vzcy5lbnYuREJfVVNFUk5BTUUgfHwgXCJmb3JnZVwiLFxuXG4gICAgXG4gICAgLyoqXG4gICAgICogSGVyZSB5b3UgbWF5IHNwZWNpZnkgdGhlIHBhc3N3b3JkIG9mIGRhdGFiYXNlIHdoaWNoIHdpbGwgYmVcbiAgICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAgICovXG4gICAgcGFzc3dvcmQgOiBwcm9jZXNzLmVudi5EQl9QQVNTV09SRCB8fCBcIlwiLFxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2VBQWU7RUFFWDtBQUNKO0FBQ0E7QUFDQTtFQUNJQSxVQUFVLEVBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxhQUFhLElBQUksT0FBTztFQUdqRDtBQUNKO0FBQ0E7QUFDQTtFQUNJQyxJQUFJLEVBQUlILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxPQUFPLElBQUksV0FBVztFQUcxQztBQUNKO0FBQ0E7QUFDQTtFQUNJQyxJQUFJLEVBQUdMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxPQUFPLElBQUksSUFBSTtFQUdsQztBQUNKO0FBQ0E7QUFDQTtFQUNJQyxRQUFRLEVBQUlQLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTyxXQUFXLElBQUksT0FBTztFQUc5QztBQUNKO0FBQ0E7QUFDQTtFQUNJQyxRQUFRLEVBQUdULE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUyxXQUFXLElBQUksT0FBTztFQUc3QztBQUNKO0FBQ0E7QUFDQTtFQUNJQyxRQUFRLEVBQUdYLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVyxXQUFXLElBQUk7QUFDMUMsQ0FBQztBQUFBQyxPQUFBLGNBQUFDLFFBQUEifQ==