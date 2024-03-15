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
  host: process.env.DB_HOST || "srv1098.hstgr.io",
  /**
   * Here you may specify the port of database which will be
   * used for connection
   */
  port: process.env.DB_PORT || 3306,
  /**
   * Here you may specify the database name of connection which will be
   * used for connection
   */
  database: process.env.DB_DATABASE || "u898129453_ecoflofo",
  /**
   * Here you may specify the username of database which will be
   * used for connection
   */
  username: process.env.DB_USERNAME || "u898129453_ecoflofo",
  /**
   * Here you may specify the password of database which will be
   * used for connection
   */
  password: process.env.DB_PASSWORD || "$@|HM~p5M!n"
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb25uZWN0aW9uIiwicHJvY2VzcyIsImVudiIsIkRCX0NPTk5FQ1RJT04iLCJob3N0IiwiREJfSE9TVCIsInBvcnQiLCJEQl9QT1JUIiwiZGF0YWJhc2UiLCJEQl9EQVRBQkFTRSIsInVzZXJuYW1lIiwiREJfVVNFUk5BTUUiLCJwYXNzd29yZCIsIkRCX1BBU1NXT1JEIiwiZXhwb3J0cyIsIl9kZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB3aGljaCBvZiB0aGUgZGF0YWJhc2UgY29ubmVjdGlvbnMgYmVsb3cgeW91IHdpc2hcbiAgICAgKiB0byB1c2UgYXMgeW91ciBkZWZhdWx0IGNvbm5lY3Rpb24gZm9yIGFsbCBkYXRhYmFzZSB3b3JrLiBcbiAgICAgKi9cbiAgICBjb25uZWN0aW9uIDogcHJvY2Vzcy5lbnYuREJfQ09OTkVDVElPTiB8fCBcIm15c3FsXCIsXG5cblxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBob3N0IGFkZHJlc3Mgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBob3N0ICA6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgXCJzcnYxMDk4LmhzdGdyLmlvXCIsXG5cbiAgICBcbiAgICAvKipcbiAgICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB0aGUgcG9ydCBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIHBvcnQgOiBwcm9jZXNzLmVudi5EQl9QT1JUIHx8IDMzMDYsXG5cblxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBkYXRhYmFzZSBuYW1lIG9mIGNvbm5lY3Rpb24gd2hpY2ggd2lsbCBiZVxuICAgICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBkYXRhYmFzZSAgOiBwcm9jZXNzLmVudi5EQl9EQVRBQkFTRSB8fCBcInU4OTgxMjk0NTNfZWNvZmxvZm9cIixcblxuICAgIFxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSB1c2VybmFtZSBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIHVzZXJuYW1lIDogcHJvY2Vzcy5lbnYuREJfVVNFUk5BTUUgfHwgXCJ1ODk4MTI5NDUzX2Vjb2Zsb2ZvXCIsXG5cbiAgICBcbiAgICAvKipcbiAgICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB0aGUgcGFzc3dvcmQgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBwYXNzd29yZCA6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEIHx8IFwiJEB8SE1+cDVNIW5cIixcbn0iXSwibWFwcGluZ3MiOiI7Ozs7OztlQUFlO0VBRVg7QUFDSjtBQUNBO0FBQ0E7RUFDSUEsVUFBVSxFQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsYUFBYSxJQUFJLE9BQU87RUFHakQ7QUFDSjtBQUNBO0FBQ0E7RUFDSUMsSUFBSSxFQUFJSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csT0FBTyxJQUFJLGtCQUFrQjtFQUdqRDtBQUNKO0FBQ0E7QUFDQTtFQUNJQyxJQUFJLEVBQUdMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxPQUFPLElBQUksSUFBSTtFQUdsQztBQUNKO0FBQ0E7QUFDQTtFQUNJQyxRQUFRLEVBQUlQLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTyxXQUFXLElBQUkscUJBQXFCO0VBRzVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0lDLFFBQVEsRUFBR1QsT0FBTyxDQUFDQyxHQUFHLENBQUNTLFdBQVcsSUFBSSxxQkFBcUI7RUFHM0Q7QUFDSjtBQUNBO0FBQ0E7RUFDSUMsUUFBUSxFQUFHWCxPQUFPLENBQUNDLEdBQUcsQ0FBQ1csV0FBVyxJQUFJO0FBQzFDLENBQUM7QUFBQUMsT0FBQSxjQUFBQyxRQUFBIn0=