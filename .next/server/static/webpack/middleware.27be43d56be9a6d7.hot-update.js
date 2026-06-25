"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    if (request.nextUrl.pathname === '/admin/login') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    }\n    const isLoggedIn = request.cookies.get('pawmart_admin_session')?.value === 'authenticated';\n    if (!isLoggedIn) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/admin/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        '/admin/:path*'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEM7QUFHbkMsU0FBU0MsV0FBV0MsT0FBb0I7SUFDN0MsSUFBSUEsUUFBUUMsT0FBTyxDQUFDQyxRQUFRLEtBQUssZ0JBQWdCO1FBQy9DLE9BQU9KLHFEQUFZQSxDQUFDSyxJQUFJO0lBQzFCO0lBRUEsTUFBTUMsYUFBYUosUUFBUUssT0FBTyxDQUFDQyxHQUFHLENBQUMsMEJBQTBCQyxVQUFVO0lBRTNFLElBQUksQ0FBQ0gsWUFBWTtRQUNmLE9BQU9OLHFEQUFZQSxDQUFDVSxRQUFRLENBQUMsSUFBSUMsSUFBSSxnQkFBZ0JULFFBQVFVLEdBQUc7SUFDbEU7SUFFQSxPQUFPWixxREFBWUEsQ0FBQ0ssSUFBSTtBQUMxQjtBQUVPLE1BQU1RLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztLQUFnQjtBQUM1QixFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXERFTExcXERlc2t0b3BcXHBhd21hcnRcXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmV4cG9ydCBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0Lm5leHRVcmwucGF0aG5hbWUgPT09ICcvYWRtaW4vbG9naW4nKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KClcbiAgfVxuXG4gIGNvbnN0IGlzTG9nZ2VkSW4gPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KCdwYXdtYXJ0X2FkbWluX3Nlc3Npb24nKT8udmFsdWUgPT09ICdhdXRoZW50aWNhdGVkJ1xuXG4gIGlmICghaXNMb2dnZWRJbikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2FkbWluL2xvZ2luJywgcmVxdWVzdC51cmwpKVxuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KClcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogWycvYWRtaW4vOnBhdGgqJ10sXG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJuZXh0VXJsIiwicGF0aG5hbWUiLCJuZXh0IiwiaXNMb2dnZWRJbiIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwiY29uZmlnIiwibWF0Y2hlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});