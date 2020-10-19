(this["webpackJsonpreact-poker"] = this["webpackJsonpreact-poker"] || []).push([[0],{

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"main":"LoginPage_main__1-3jE"};

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(322);


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 294:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 294;

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(177);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/actioncable/lib/assets/compiled/action_cable.js
var action_cable = __webpack_require__(178);
var action_cable_default = /*#__PURE__*/__webpack_require__.n(action_cable);

// EXTERNAL MODULE: ./node_modules/graphql-ruby-client/dist/index.js
var dist = __webpack_require__(179);

// EXTERNAL MODULE: ./node_modules/@apollo/client/index.js
var client = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/@apollo/client/link/context/index.js
var context = __webpack_require__(181);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js + 1 modules
var react_router_dom = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/classnames/bind.js
var bind = __webpack_require__(40);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(50);

// CONCATENATED MODULE: ./src/Graphql.js
function _templateObject5(){var data=Object(taggedTemplateLiteral["a" /* default */])(["\n  mutation($input: MakeMoveInput!) {\n    makeMove(input: $input) {\n      success\n    }\n  }\n"]);_templateObject5=function _templateObject5(){return data;};return data;}function _templateObject4(){var data=Object(taggedTemplateLiteral["a" /* default */])(["\n  subscription($roomId: ID!) {\n    getRoom(roomId: $roomId) {\n      moveTimeLimit\n      currentGame {\n        version\n        currentPlayer {\n          ...FullPlayer\n        }\n        currentStage\n        isFinished\n        smallBlind\n        bigBlind\n        pot\n        boardCards {\n          rank\n          color\n        }\n        players {\n          ...FullPlayer\n        }\n      }\n    }\n  }\n\n  ","\n"]);_templateObject4=function _templateObject4(){return data;};return data;}function _templateObject3(){var data=Object(taggedTemplateLiteral["a" /* default */])(["\n  fragment FullPlayer on Player {\n    id\n    name\n    active\n    isInTurn\n    avatarUrl\n    balance\n    moneyInPot\n    position\n    seatNumber\n    cards {\n      rank\n      color\n    }\n  }\n"]);_templateObject3=function _templateObject3(){return data;};return data;}function _templateObject2(){var data=Object(taggedTemplateLiteral["a" /* default */])(["\n  query GetRooms {\n    rooms {\n      id\n      name\n    }\n  }\n"]);_templateObject2=function _templateObject2(){return data;};return data;}function _templateObject(){var data=Object(taggedTemplateLiteral["a" /* default */])(["\n  mutation($username: String!, $password: String!) {\n    signinUser(input: { username: $username, password: $password }) {\n      userId\n      token\n    }\n  }\n"]);_templateObject=function _templateObject(){return data;};return data;}var SIGNIN_USER_MUTATON=Object(client["gql"])(_templateObject());var GET_ROOMS_QUERY=Object(client["gql"])(_templateObject2());var FULL_PLAYER_FRAGMENT=Object(client["gql"])(_templateObject3());var GET_ROOM_SUBSCRIPTION=Object(client["gql"])(_templateObject4(),FULL_PLAYER_FRAGMENT);var MAKE_MOVE_MUTATION=Object(client["gql"])(_templateObject5());
// CONCATENATED MODULE: ./src/components/LobbyPage/index.js
var LobbyPage_LobbyPage=function LobbyPage(){var _useQuery=Object(client["useQuery"])(GET_ROOMS_QUERY),_useQuery$data=_useQuery.data;_useQuery$data=_useQuery$data===void 0?{}:_useQuery$data;var rooms=_useQuery$data.rooms,loading=_useQuery.loading,error=_useQuery.error;if(error){throw new Error(error);}if(loading){return/*#__PURE__*/react_default.a.createElement("div",null,"Loading...");}return/*#__PURE__*/react_default.a.createElement("div",null,/*#__PURE__*/react_default.a.createElement("ul",null,rooms.map(function(room){return/*#__PURE__*/react_default.a.createElement("li",{key:room.id},/*#__PURE__*/react_default.a.createElement(react_router_dom["b" /* Link */],{to:"rooms/".concat(room.id)}," Room /",room.name,"/ "));})));};/* harmony default export */ var components_LobbyPage = (LobbyPage_LobbyPage);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(187);

// EXTERNAL MODULE: ./src/components/RoomPage/index.module.scss
var index_module = __webpack_require__(85);
var index_module_default = /*#__PURE__*/__webpack_require__.n(index_module);

// CONCATENATED MODULE: ./src/components/RoomPage/TurnMenu.js
var cx=bind_default.a.bind(index_module_default.a);var TurnMenu_TurnMenu=function TurnMenu(_ref){var minRaiseAmount=_ref.minRaiseAmount,makeMove=_ref.makeMove;var _useState=Object(react["useState"])(minRaiseAmount),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),raiseAmount=_useState2[0],setRaiseAmount=_useState2[1];var handleRaiseRangeChange=Object(react["useCallback"])(function(e){setRaiseAmount(parseInt(e.target.value,10));},[]);return/*#__PURE__*/react_default.a.createElement("div",{className:cx('turn-menu')},/*#__PURE__*/react_default.a.createElement("div",{className:cx('raise-amount-row')},/*#__PURE__*/react_default.a.createElement("input",{value:raiseAmount,size:"5",onChange:handleRaiseRangeChange}),/*#__PURE__*/react_default.a.createElement("input",{type:"range",id:"raise-range",name:"raise-range",value:raiseAmount,onChange:handleRaiseRangeChange,min:minRaiseAmount,max:"1000"})),/*#__PURE__*/react_default.a.createElement("div",{className:cx('buttons-row')},/*#__PURE__*/react_default.a.createElement("button",{type:"button",className:cx('fold'),onClick:function onClick(_e){return makeMove({move:'fold'});}},"Fold"),/*#__PURE__*/react_default.a.createElement("button",{type:"button",className:cx('call'),onClick:function onClick(_e){return makeMove({move:'call'});}},"Call"),/*#__PURE__*/react_default.a.createElement("button",{type:"button",className:cx('raise'),onClick:function onClick(){return makeMove({move:'raise',bet:raiseAmount});}},"Raise ",raiseAmount)));};/* harmony default export */ var RoomPage_TurnMenu = (TurnMenu_TurnMenu);
// CONCATENATED MODULE: ./src/components/RoomPage/index.js
var RoomPage_cx=bind_default.a.bind(index_module_default.a);var RoomPage_RoomPage=function RoomPage(){var _game$currentPlayer;var _useParams=Object(react_router["h" /* useParams */])(),roomId=_useParams.roomId;var _useSubscription=Object(client["useSubscription"])(GET_ROOM_SUBSCRIPTION,{variables:{roomId:roomId}}),_useSubscription$data=_useSubscription.data;_useSubscription$data=_useSubscription$data===void 0?{}:_useSubscription$data;var getRoom=_useSubscription$data.getRoom,loading=_useSubscription.loading,error=_useSubscription.error;var _useMutation=Object(client["useMutation"])(MAKE_MOVE_MUTATION),_useMutation2=Object(slicedToArray["a" /* default */])(_useMutation,1),_makeMove=_useMutation2[0];var makeMove=function makeMove(_ref){var move=_ref.move,bet=_ref.bet,xPlayerId=_ref.xPlayerId;_makeMove({variables:{input:{gameVersion:getRoom.currentGame.version,move:move,bet:bet,xPlayerId:xPlayerId}}});};// Hack for development
// TODO: Replace this with something more sophisticated
window.makeMove=makeMove;if(error){throw new Error(error);}if(loading){console.log('Loading...');return'Loading...';}var game=getRoom.currentGame,moveTimeLimit=getRoom.moveTimeLimit;return/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('room')},/*#__PURE__*/react_default.a.createElement(Table,{game:game,moveTimeLimit:moveTimeLimit}),/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('footer')},/*#__PURE__*/react_default.a.createElement("div",null),((_game$currentPlayer=game.currentPlayer)===null||_game$currentPlayer===void 0?void 0:_game$currentPlayer.isInTurn)&&/*#__PURE__*/react_default.a.createElement(RoomPage_TurnMenu,{minRaiseAmount:200,makeMove:makeMove})));};function Table(_ref2){var game=_ref2.game,moveTimeLimit=_ref2.moveTimeLimit;console.log(game);return/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('table')},/*#__PURE__*/react_default.a.createElement("div",null,/*#__PURE__*/react_default.a.createElement("p",null,"Pot: $",game.pot),/*#__PURE__*/react_default.a.createElement("p",null,"Small blind: $",game.smallBlind),/*#__PURE__*/react_default.a.createElement("p",null,"Big blind: $",game.bigBlind),/*#__PURE__*/react_default.a.createElement("p",null,"Player in turn: ",game.players.find(function(_ref3){var isInTurn=_ref3.isInTurn;return isInTurn;}).id)),game.players.map(function(player){var _game$currentPlayer2;if((game===null||game===void 0?void 0:(_game$currentPlayer2=game.currentPlayer)===null||_game$currentPlayer2===void 0?void 0:_game$currentPlayer2.id)===player.id){return/*#__PURE__*/react_default.a.createElement(Seat,{key:player.seatNumber,player:game.currentPlayer,smallBlind:game.smallBlind});}return/*#__PURE__*/react_default.a.createElement(Seat,{key:player.seatNumber,player:player,smallBlind:game.smallBlind,moveTimeLimit:moveTimeLimit});}),/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('common-cards')},game.boardCards.map(imgSlugForCard).map(function(slug){return/*#__PURE__*/react_default.a.createElement("img",{className:RoomPage_cx('card'),src:"/cards/".concat(slug,".png"),alt:slug});})));}var seatStyles={0:{dealerClass:'dealer-bottom-right',chipsClass:'chips-bottom-right',seatClass:'bottom-right',infoBoxPosition:'left'},1:{dealerClass:'dealer-middle-right',chipsClass:'chips-middle-right',seatClass:'middle-right',infoBoxPosition:'center'},2:{dealerClass:'dealer-top-right',chipsClass:'chips-top-right',seatClass:'top-right',infoBoxPosition:'right'},3:{dealerClass:'dealer-top-left',chipsClass:'chips-top-left',seatClass:'top-left',infoBoxPosition:'right'},4:{dealerClass:'dealer-middle-left',chipsClass:'chips-middle-left',seatClass:'middle-left',infoBoxPosition:'center'},5:{dealerClass:'dealer-bottom-left',chipsClass:'chips-bottom-left',seatClass:'bottom-left',infoBoxPosition:'left'}};function PlayerChips(_ref4){var smallBlind=_ref4.smallBlind,betAmount=_ref4.betAmount,classes=_ref4.classes;var blackChipValue=10*smallBlind;var blueChipValue=smallBlind;var blackChipsCount=parseInt(betAmount/blackChipValue,10);var blueChipsCount=parseInt((betAmount-blackChipsCount*blackChipValue)/blueChipValue,10);return/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx(['chips-container'].concat(Object(toConsumableArray["a" /* default */])(classes)))},/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('chip-column')},!!blackChipsCount&&Array.from({length:blackChipsCount},function(){return/*#__PURE__*/react_default.a.createElement("img",{src:"/chips/chip-black.png",alt:"blue-chip",className:RoomPage_cx('chip')});})),/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('chip-column')},!!blueChipsCount&&Array.from({length:blueChipsCount},function(){return/*#__PURE__*/react_default.a.createElement("img",{src:"/chips/chip-blue.png",alt:"blue-chip",className:RoomPage_cx('chip')});})));}function Seat(_ref5){var _cx;var player=_ref5.player,smallBlind=_ref5.smallBlind,moveTimeLimit=_ref5.moveTimeLimit;var _useState=Object(react["useState"])(moveTimeLimit),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),countdownSeconds=_useState2[0],setCountdownSeconds=_useState2[1];var firstCard=player.cards[0];var secondCard=player.cards[1];Object(react["useEffect"])(function(){if(!player.isInTurn){setCountdownSeconds(moveTimeLimit);return function(){};}if(countdownSeconds<=0)return function(){};var tid=setTimeout(function(){setCountdownSeconds(countdownSeconds-0.5);},500);return function(){clearTimeout(tid);};},[player.isInTurn,countdownSeconds]);var _seatStyles$player$se=seatStyles[player.seatNumber],seatClass=_seatStyles$player$se.seatClass,infoBoxPosition=_seatStyles$player$se.infoBoxPosition,dealerClass=_seatStyles$player$se.dealerClass,chipsClass=_seatStyles$player$se.chipsClass;var countdownClasses=RoomPage_cx({'time-bar':true,red:countdownSeconds<3});var seatClasses=RoomPage_cx((_cx={seat:true},Object(defineProperty["a" /* default */])(_cx,seatClass,true),Object(defineProperty["a" /* default */])(_cx,"inactive",!player.active),_cx));return/*#__PURE__*/react_default.a.createElement("div",{key:player.id},player.position==='D'&&/*#__PURE__*/react_default.a.createElement("img",{src:"/chips/chip-dealer.png",alt:"dealer-chip",className:RoomPage_cx('dealer-chip',dealerClass)}),/*#__PURE__*/react_default.a.createElement(PlayerChips,{classes:[chipsClass],smallBlind:smallBlind,betAmount:player.moneyInPot}),/*#__PURE__*/react_default.a.createElement("div",{className:seatClasses},/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('avatar')},' ',/*#__PURE__*/react_default.a.createElement("img",{src:"/avatars/business-man-avatar.png",alt:"business-man-avatar"}),' '),/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('info-box',infoBoxPosition)},/*#__PURE__*/react_default.a.createElement("span",null,player.name),/*#__PURE__*/react_default.a.createElement("span",null,"$",player.balance),/*#__PURE__*/react_default.a.createElement("div",{className:RoomPage_cx('cards-wrapper')},/*#__PURE__*/react_default.a.createElement("img",{src:"/cards/".concat(imgSlugForCard(firstCard),".png"),alt:imgSlugForCard(firstCard),className:RoomPage_cx({card:true,raised:!!firstCard})}),/*#__PURE__*/react_default.a.createElement("img",{src:"/cards/".concat(imgSlugForCard(secondCard),".png"),alt:imgSlugForCard(firstCard),className:RoomPage_cx({kcard:true,raised:!!secondCard})})),player.isInTurn?/*#__PURE__*/react_default.a.createElement("progress",{value:countdownSeconds*2,max:moveTimeLimit*2,className:countdownClasses}):null)));}var imgSlugForCard=function imgSlugForCard(_ref6){var rank=_ref6.rank,color=_ref6.color;if(rank==='hidden')return'back';var rankToPath={A:'1',J:'jack',Q:'queen',K:'king'};return"".concat(color,"_").concat(rankToPath[rank]||rank);};/* harmony default export */ var components_RoomPage = (RoomPage_RoomPage);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(109);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(184);

// EXTERNAL MODULE: ./src/components/LoginPage/index.module.scss
var LoginPage_index_module = __webpack_require__(185);
var LoginPage_index_module_default = /*#__PURE__*/__webpack_require__.n(LoginPage_index_module);

// CONCATENATED MODULE: ./src/components/LoginPage/index.js
var LoginPage_cx=bind_default.a.bind(LoginPage_index_module_default.a);var LoginPage_LoginPage=function LoginPage(_ref){var onSuccessLogin=_ref.onSuccessLogin,isAuthenticated=_ref.isAuthenticated;var _useMutation=Object(client["useMutation"])(SIGNIN_USER_MUTATON),_useMutation2=Object(slicedToArray["a" /* default */])(_useMutation,1),login=_useMutation2[0];var _useState=Object(react["useState"])(''),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),username=_useState2[0],setUsername=_useState2[1];var _useState3=Object(react["useState"])(''),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),password=_useState4[0],setPassword=_useState4[1];var handleSubmit=/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(e){var _yield$login,_yield$login$data,_yield$login$data$sig,token,error;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:e.preventDefault();_context.next=3;return login({variables:{username:username,password:password}});case 3:_yield$login=_context.sent;_yield$login$data=_yield$login.data;_yield$login$data=_yield$login$data===void 0?{}:_yield$login$data;_yield$login$data$sig=_yield$login$data.signinUser;_yield$login$data$sig=_yield$login$data$sig===void 0?{}:_yield$login$data$sig;token=_yield$login$data$sig.token,error=_yield$login.error;if(!error){_context.next=12;break;}console.error(error);return _context.abrupt("return");case 12:onSuccessLogin(token);case 13:case"end":return _context.stop();}}},_callee);}));return function handleSubmit(_x){return _ref2.apply(this,arguments);};}();if(isAuthenticated)return/*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */],{to:"/"});return/*#__PURE__*/react_default.a.createElement("div",{className:LoginPage_cx('main')},/*#__PURE__*/react_default.a.createElement("form",{onSubmit:handleSubmit},/*#__PURE__*/react_default.a.createElement("input",{type:"text",placeholder:"username",value:username,onChange:function onChange(e){setUsername(e.target.value);}}),/*#__PURE__*/react_default.a.createElement("input",{type:"password",placeholder:"password",value:password,onChange:function onChange(e){setPassword(e.target.value);}}),/*#__PURE__*/react_default.a.createElement("button",{type:"submit"}," Login ")));};/* harmony default export */ var components_LoginPage = (LoginPage_LoginPage);
// EXTERNAL MODULE: ./src/components/App/index.module.scss
var App_index_module = __webpack_require__(186);
var App_index_module_default = /*#__PURE__*/__webpack_require__.n(App_index_module);

// CONCATENATED MODULE: ./src/components/App/index.js
var App_cx=bind_default.a.bind(App_index_module_default.a);var App_ScrollToTop=function ScrollToTop(){var _useLocation=Object(react_router["g" /* useLocation */])(),pathname=_useLocation.pathname;Object(react["useEffect"])(function(){window.scrollTo(0,0);},[pathname]);return null;};var App_App=function App(){// TODO: handle outdated tokens
var _useState=Object(react["useState"])(!!localStorage.getItem('token')),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),isAuthenticated=_useState2[0],setIsAuthenticated=_useState2[1];var handleSuccessLogin=function handleSuccessLogin(token){localStorage.setItem('token',token);setIsAuthenticated(true);};return/*#__PURE__*/react_default.a.createElement("div",{className:App_cx('main')},/*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* BrowserRouter */],null,/*#__PURE__*/react_default.a.createElement(App_ScrollToTop,null),/*#__PURE__*/react_default.a.createElement(react["Suspense"],{fallback:/*#__PURE__*/react_default.a.createElement("div",null,"Loading...")},/*#__PURE__*/react_default.a.createElement(react_router["d" /* Switch */],null,/*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */],{exact:true,path:"/login",render:function render(routeProps){return/*#__PURE__*/react_default.a.createElement(components_LoginPage,Object.assign({onSuccessLogin:handleSuccessLogin,isAuthenticated:isAuthenticated},routeProps));}}),/*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */],{path:"/",exact:true,render:function render(routeProps){return isAuthenticated?/*#__PURE__*/react_default.a.createElement(components_LobbyPage,routeProps):/*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */],{to:"/login"});}}),/*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */],{path:"/rooms/:roomId",exact:true,render:function render(routeProps){return isAuthenticated?/*#__PURE__*/react_default.a.createElement(components_RoomPage,routeProps):/*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */],{to:"/login"});}})))));};/* harmony default export */ var components_App = (App_App);
// CONCATENATED MODULE: ./src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.0/8 are considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if( true&&'serviceWorker'in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("/re-poker",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener('load',function(){var swUrl="".concat("/re-poker","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service '+'worker. To learn more, visit https://bit.ly/CRA-PWA');});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){/* eslint no-param-reassign: ["error", { "props": false }] */registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log('New content is available and will be used when all '+'tabs for this page are closed. See https://bit.ly/CRA-PWA.');// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log('Content is cached for offline use.');// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl,{headers:{'Service-Worker':'script'}}).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get('content-type');if(response.status===404||contentType!=null&&contentType.indexOf('javascript')===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();}).catch(function(error){console.error(error.message);});}}
// CONCATENATED MODULE: ./src/index.js
var httpLink=Object(client["createHttpLink"])({uri:'http://localhost:3000/graphql'});var hasSubscriptionOperation=function hasSubscriptionOperation(_ref){var definitions=_ref.query.definitions;return definitions.some(function(_ref2){var kind=_ref2.kind,operation=_ref2.operation;return kind==='OperationDefinition'&&operation==='subscription';});};var authLink=Object(context["a" /* setContext */])(function(obj,_ref3){var headers=_ref3.headers;var token=localStorage.getItem('token');return{headers:Object(objectSpread2["a" /* default */])({},headers,{authorization:token?"Bearer ".concat(token):''})};});var httpAuthLink=authLink.concat(httpLink);// TODO: Send the token dynamically
var src_token=localStorage.getItem('token');var cable=action_cable_default.a.createConsumer('ws://localhost:3000/cable');var cableAuthLink=authLink.concat(new dist["ActionCableLink"]({cable:cable,connectionParams:{token:src_token}}));var src_link=client["ApolloLink"].split(hasSubscriptionOperation,cableAuthLink,httpAuthLink);// Initialize the client
var apolloClient=new client["ApolloClient"]({link:src_link,cache:new client["InMemoryCache"]()});react_dom_default.a.render(/*#__PURE__*/react_default.a.createElement(client["ApolloProvider"],{client:apolloClient},/*#__PURE__*/react_default.a.createElement(components_App,null)),document.getElementById('root'));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"room":"RoomPage_room__31QOV","table":"RoomPage_table__3G9fA","dealer-chip":"RoomPage_dealer-chip__oUxPd","dealer-top-right":"RoomPage_dealer-top-right__3x5oI","dealer-top-left":"RoomPage_dealer-top-left__3d6of","dealer-middle-right":"RoomPage_dealer-middle-right__1LDVE","dealer-middle-left":"RoomPage_dealer-middle-left__2zM80","dealer-bottom-right":"RoomPage_dealer-bottom-right__3NCZm","dealer-bottom-left":"RoomPage_dealer-bottom-left__2GY36","chips-container":"RoomPage_chips-container__ye1MQ","chip-column":"RoomPage_chip-column__3QP8B","chip":"RoomPage_chip__3tF38","chips-top-right":"RoomPage_chips-top-right__7q9rL","chips-top-left":"RoomPage_chips-top-left__1JlA2","chips-middle-right":"RoomPage_chips-middle-right__36UZE","chips-middle-left":"RoomPage_chips-middle-left__1NPiL","chips-bottom-right":"RoomPage_chips-bottom-right__2eB1v","chips-bottom-left":"RoomPage_chips-bottom-left__JIjfe","common-cards":"RoomPage_common-cards__3MJJv","card":"RoomPage_card__3z3yr","seat":"RoomPage_seat__2nDCN","inactive":"RoomPage_inactive__30FxZ","info-box":"RoomPage_info-box__aeFyN","cards-wrapper":"RoomPage_cards-wrapper__wU4bP","top-right":"RoomPage_top-right__EJzfm","top-left":"RoomPage_top-left__2lONB","middle-right":"RoomPage_middle-right__2505e","middle-left":"RoomPage_middle-left__1FsQh","bottom-right":"RoomPage_bottom-right__3Fn77","bottom-left":"RoomPage_bottom-left__1XbLa","avatar":"RoomPage_avatar__3JHpS","time-bar":"RoomPage_time-bar__2qpv8","animate-stripes":"RoomPage_animate-stripes__3gSYV","red":"RoomPage_red__kEhWf","pulse":"RoomPage_pulse__1_oju","raised":"RoomPage_raised__3VY_H","center":"RoomPage_center__1DlZo","left":"RoomPage_left__COpqe","right":"RoomPage_right__3bBty","footer":"RoomPage_footer__1RpJG","turn-menu":"RoomPage_turn-menu__JX3sC","raise-amount-row":"RoomPage_raise-amount-row__3kl_F","buttons-row":"RoomPage_buttons-row__ZlY1o"};

/***/ })

},[[188,1,2]]]);
//# sourceMappingURL=main.f3654bff.chunk.js.map