/**
 * Export module.
 *
 * Parts of Export functionality rely on the following third party libraries:
 *
 * [Fabric.js](http://fabricjs.com/)
 * Copyright (c) Printio (Juriy Zaytsev, Maxim Chernyak)
 * Licensed under [MIT](https://github.com/kangax/fabric.js/blob/master/LICENSE)
 *
 * [pdfmake](http://pdfmake.org/)
 * Copyright (c) 2014 bpampuch
 * Licensed under [MIT](https://github.com/bpampuch/pdfmake/blob/master/LICENSE)
 *
 * [SheetJS Community Edition](https://github.com/sheetjs/js-xlsx)
 * Licensed under [Apache License 2.0](https://github.com/SheetJS/js-xlsx/blob/master/LICENSE)
 *
 * [JSZip](http://stuartk.com/jszip)
 * Copyright (c) Stuart Knightley
 * Dual licenced under the [MIT license or GPLv3](https://raw.githubusercontent.com/Stuk/jszip/master/LICENSE.markdown).
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ExportMenu } from "./ExportMenu";
import { Adapter } from "../utils/Adapter";
import { Modal } from "../elements/Modal";
import { List } from "../utils/List";
import { Dictionary } from "../utils/Dictionary";
import { DateFormatter } from "../formatters/DateFormatter";
import { Language } from "../utils/Language";
import { Validatable } from "../utils/Validatable";
import { color } from "../utils/Color";
import { registry } from "../Registry";
import * as $object from "../utils/Object";
import * as $net from "../utils/Net";
import * as $dom from "../utils/DOM";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * [[Export]] allows downloading of current snapshot of the chart as an
 * image, PDF, or its data in various formats.
 *
 * The export functionality is enabled by default in charts and is accessible
 * via API or optional export menu.
 *
 * To enable menu, simply access export's `menu` property. E.g.:
 *
 * ```TypeScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JavaScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JSON
 * {
 *   // ...
 *   "exporting": {
 *     "menu": {}
 *   }
 * }
 * ```
 *
 * To export via API, use `export()` method:
 *
 * ```TypeScript
 * chart.exporting.export(type, [options]);
 * ```
 * ```JavaScript
 * chart.exporting.export(type, [options]);
 * ```
 *
 * E.g.:
 *
 * ```TypeScript
 * chart.exporting.export("png");
 * ```
 * ```JavaScript
 * chart.exporting.export("png");
 * ```
 *
 * @todo Better loading indicator?
 * @todo Implement multiplier option
 * @todo Handling of hanged exports
 * @important
 */
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    /**
     * Constructor
     */
    function Export() {
        var _this = _super.call(this) || this;
        /**
         * Adapter.
         *
         * @type {Adapter<Export, IExportAdapters>}
         */
        _this.adapter = new Adapter(_this);
        /**
         * Holds options for each format.
         *
         * @ignore Exclude from docs
         * @type {Dictionary<string, ExportOptions>}
         */
        _this._formatOptions = new Dictionary();
        /**
         * Holds a list of objects that were temporarily removed from the DOM while
         * exporting. Those most probably are tainted images, or foreign objects that
         * would otherwise prevent SVG to be converted to canvas.
         *
         * @ignore Exclude from docs
         * @type {List<IExportRemovedObject>}
         */
        _this._removedObjects = new List();
        /**
         * Exported files will be prefixed with whatever it is set here.
         *
         * @ignore Exclude from docs
         * @type {string}
         */
        _this._filePrefix = "amCharts";
        /**
         * If export operation takes longer than milliseconds in this second, we will
         * show a modal saying export operation took longer than expected.
         *
         * @type {number}
         */
        _this.timeoutDelay = 2000;
        _this.className = "Export";
        // Set default options
        _this._formatOptions.setKey("png", {});
        _this._formatOptions.setKey("jpg", {
            quality: 0.8
        });
        _this._formatOptions.setKey("gif", {});
        _this._formatOptions.setKey("svg", {});
        _this._formatOptions.setKey("pdf", {
            fontSize: 14,
            imageFormat: "png",
            addURL: true
        });
        _this._formatOptions.setKey("json", {
            indent: 2,
            useLocale: true
        });
        _this._formatOptions.setKey("csv", {
            addColumnNames: true
        });
        _this._formatOptions.setKey("xlsx", {
            addColumnNames: true,
            useLocale: true
        });
        _this._formatOptions.setKey("print", {
            delay: 500
        });
        // Add options adapter
        _this.adapter.add("options", function (arg) {
            var formatOptions = _this._formatOptions.getKey(arg.type);
            if (arg.options) {
                arg.options = $object.merge(arg.options, formatOptions);
            }
            else {
                arg.options = formatOptions;
            }
            return arg;
        });
        _this.applyTheme();
        _this.dispatchImmediately("inited");
        return _this;
    }
    Object.defineProperty(Export.prototype, "menu", {
        /**
         * @return {ExportMenu} ExportMenu instance
         */
        get: function () {
            return this._menu;
        },
        /**
         * An instance of [[ExportMenu]].
         *
         * To add an export menu to a chart, set this to a new instance of
         * [[ExportMenu]].
         *
         * ```TypeScript
         * chart.exporting.menu = new am4core.ExportMenu();
         * ```
         * ```JavaScript
         * chart.exporting.menu = new am4core.ExportMenu();
         * ```
         * ```JSON
         * {
         *   // ...
         *   "exporting": {
         *     "menu": {}
         *   }
         * }
         * ```
         *
         * @param {ExportMenu}  menu  ExportMenu instance
         */
        set: function (menu) {
            var _this = this;
            if (this._menu) {
                this.removeDispose(this._menu);
            }
            this._menu = menu;
            // Set container and language
            this._menu.container = this.container;
            this._menu.language = this._language;
            // Add adapter to check for browser support
            this._menu.adapter.add("branch", function (arg) {
                arg.branch.unsupported = !_this.typeSupported(arg.branch.type);
                return arg;
            });
            // Add click events
            this._menu.events.on("hit", function (ev) {
                _this.export(ev.branch.type, ev.branch.options);
                _this.menu.close();
            });
            this._menu.events.on("enter", function (ev) {
                _this.export(ev.branch.type, ev.branch.options);
                _this.menu.close();
            });
            this._menu.events.on("over", function (ev) {
                _this._disableMouse();
            });
            this._menu.events.on("out", function (ev) {
                _this._releaseMouse();
            });
            // Dispatch event
            this.dispatchImmediately("menucreated");
            // Prefix with Sprite's class name
            this._menu.adapter.add("classPrefix", function (obj) {
                obj.classPrefix = _this.sprite.classNamePrefix + obj.classPrefix;
                return obj;
            });
            // Add menu to disposers so that it's destroyed when Export is disposed
            this._disposers.push(this._menu);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if this specific menu item type is supported by current system.
     *
     * @param  {string}   type  Menu item type
     * @return {boolean}        `false` if not supported
     */
    Export.prototype.typeSupported = function (type) {
        var supported = true;
        if (type === "pdf") {
            supported = this.linkDownloadSupport();
        }
        else if (type === "xlsx") {
            supported = this.linkDownloadSupport() && this.data;
        }
        else if (type == "print" && !window.print) {
            supported = false;
        }
        else if (["json", "csv"].indexOf(type) !== -1 && !this.data) {
            supported = false;
        }
        return this.adapter.apply("supported", {
            supported: supported,
            type: type
        }).supported;
    };
    /**
     * Get function to handle export for particular format.
     *
     * @ignore Exclude from docs
     * @type {this}
     */
    Export.prototype._getFunction = function (type) {
        switch (type) {
            case "png":
            case "gif":
            case "jpg":
                return this.getImage;
            case "svg":
                return this.getSVG;
            case "pdf":
                return this.getPDF;
            case "xlsx":
                return this.getExcel;
            case "csv":
                return this.getCSV;
            case "json":
                return this.getJSON;
            case "print":
                return this.getPrint;
            default:
                return this.unsupported;
        }
    };
    /**
     * Initiates export procedure.
     *
     * @param  {string}   type     Export type
     * @param  {Object}   options  Options
     * @return {boolean}           `true` if export was successful
     * @async
     */
    Export.prototype.export = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var func, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Dispatch event
                        if (this.events.isEnabled("exportstarted")) {
                            this.events.dispatchImmediately("exportstarted", {
                                "type": "exportstarted",
                                "target": this,
                                "format": type,
                                "options": options
                            });
                        }
                        // Schedule a preloader
                        this.showPreloader();
                        // Schedule a timeout
                        if (this.timeoutDelay) {
                            this.hideTimeout();
                            this._timeoutTimeout = this.setTimeout(function () {
                                // Dispatch event
                                if (_this.events.isEnabled("exporttimedout")) {
                                    _this.events.dispatchImmediately("exporttimedout", {
                                        "type": "exporttimedout",
                                        "target": _this,
                                        "format": type,
                                        "options": options
                                    });
                                }
                                // Show modal
                                _this.showTimeout();
                            }, this.timeoutDelay);
                        }
                        func = this._getFunction(type);
                        // Give chance for plugins to override both function and options
                        options = this.adapter.apply("options", {
                            options: options,
                            type: type
                        }).options;
                        func = this.adapter.apply("exportFunction", {
                            func: func,
                            type: type,
                            options: options
                        }).func;
                        return [4 /*yield*/, func.call(this, type, options)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            // Dispatch event
                            if (this.events.isEnabled("exportfinished")) {
                                this.events.dispatchImmediately("exportfinished", {
                                    "type": "exportfinished",
                                    "target": this,
                                    "format": type,
                                    "options": options
                                });
                            }
                            // Hide preloader and timeout modals
                            this.hidePreloader();
                            this.hideTimeout();
                            // Download or print
                            if (type === "print") {
                                return [2 /*return*/, this.print(data, options, this.adapter.apply("title", {
                                        title: this.title,
                                        options: options
                                    }).title)];
                            }
                            else {
                                return [2 /*return*/, this.download(data, this.filePrefix + "." + type)];
                            }
                        }
                        else {
                            // Throw exception?
                            // @todo
                            // Dispatch event
                            if (this.events.isEnabled("error")) {
                                this.events.dispatchImmediately("error", {
                                    "type": "error",
                                    "target": this,
                                    "format": type,
                                    "options": options
                                });
                            }
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A function that should handle unsupported export types.
     *
     * @ignore Exclude from docs
     * @param  {string}              type     Export type
     * @param  {IExportImageOptions} options  Options
     * @return {Promise<string>}               Promise
     * @async
     */
    Export.prototype.unsupported = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    /**
     * Requests a Print of the chart.
     *
     * @param  {string}               type     Export type
     * @param  {IExportImageOptions}  options  Options
     * @return {Promise<string>}               Promise
     * @async
     */
    Export.prototype.getPrint = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getImage("png", options)];
            });
        });
    };
    /**
     * Produces image output from the element.
     *
     * Converts to a `Canvas` first, then produces an image to download.
     *
     * This is an asynchronous function. Rather than returning a result, it
     * returns a Promise.
     *
     * You can use `await` notion from other async functions, or `then()`
     * anywhere else.
     *
     * ```TypeScript
     * // Async
     * let img = await chart.exporting.getImage( "PNG" );
     *
     * // Sync
     * let img;
     * chart.exporting.getImage( "PNG" ).then( ( data ) => {
     *   img = exporing;
     * } );
     * ```
     * ```JavaScript
     * var img;
     * chart.exporting.getImage( "PNG" ).then( ( data ) => {
     *   var = data;
     * } );
     * ```
     *
     * @param  {string}               type     Image format
     * @param  {IExportImageOptions}  options  Options
     * @return {Promise<string>}               Promise
     */
    Export.prototype.getImage = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var background, width, height, font, fontSize, canvas, ctx, DOMURL, data, svg, url, img, uri, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        background = this.backgroundColor || this.findBackgroundColor(this.sprite.dom);
                        return [4 /*yield*/, this.simplifiedImageExport()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 8];
                        width = this.sprite.pixelWidth, height = this.sprite.pixelHeight, font = this.findFont(this.sprite.dom), fontSize = this.findFontSize(this.sprite.dom);
                        canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext("2d");
                        // Add background if necessary
                        if (background) {
                            ctx.fillStyle = background.toString();
                            ctx.fillRect(0, 0, width, height);
                        }
                        DOMURL = this.getDOMURL();
                        // Do prepareations on a document
                        return [4 /*yield*/, Promise.all([
                                this.imagesToDataURI(this.sprite.dom, options),
                                this.prepForeignObjects(this.sprite.dom, options)
                            ])];
                    case 2:
                        // Do prepareations on a document
                        _a.sent();
                        data = this.normalizeSVG(this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, font, fontSize);
                        svg = new Blob([data], { type: "image/svg+xml" });
                        url = DOMURL.createObjectURL(svg);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.loadNewImage(url, width, height, "anonymous")];
                    case 4:
                        img = _a.sent();
                        // Draw image on canvas
                        ctx.drawImage(img, 0, 0);
                        DOMURL.revokeObjectURL(url);
                        // Options are set?
                        if (!$type.hasValue(options)) {
                            options = {};
                        }
                        uri = canvas.toDataURL(this.getContentType(type), options.quality);
                        // Restore replaced tainted images in DOM
                        this.restoreRemovedObjects();
                        // Return value
                        return [2 /*return*/, uri];
                    case 5:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.getImageAdvanced(type, options)];
                    case 6: 
                    // An error occurred, let's try advanced method
                    return [2 /*return*/, _a.sent()];
                    case 7: return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.getImageAdvanced(type, options)];
                    case 9: 
                    /**
                     * Going the hard way. Converting to canvas from each node
                     */
                    return [2 /*return*/, _a.sent()];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Tries to dynamically load [Fabric.js](http://fabricjs.com/) and export it
     * using its functions.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}               type     Image format
     * @param {IExportImageOptions}  options  Options
     * @return {Promise<string>}              Data uri
     * @todo Is toDataURL a Promise?
     */
    Export.prototype.getImageAdvanced = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fpromise, fabric, width, height, font, fontSize, data, canvas, background, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Convert external images to data uris
                    return [4 /*yield*/, this.imagesToDataURI(this.sprite.dom, options)];
                    case 1:
                        // Convert external images to data uris
                        _a.sent();
                        return [4 /*yield*/, this.fabric];
                    case 2:
                        fpromise = _a.sent();
                        fabric = fpromise.fabric;
                        width = this.sprite.pixelWidth, height = this.sprite.pixelHeight, font = this.findFont(this.sprite.dom), fontSize = this.findFontSize(this.sprite.dom);
                        data = this.normalizeSVG(this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, font, fontSize);
                        canvas = new fabric.StaticCanvas();
                        canvas.setDimensions({
                            width: width,
                            height: height
                        });
                        background = this.backgroundColor || this.findBackgroundColor(this.sprite.dom);
                        if (background) {
                            canvas.setBackgroundColor(background.toString());
                        }
                        return [4 /*yield*/, new Promise(function (success, error) {
                                fabric.loadSVGFromString(data, function (objects, fabricOptions) {
                                    var obj = fabric.util.groupSVGElements(objects, fabricOptions);
                                    canvas.add(obj).renderAll();
                                    success(canvas.toDataURL({
                                        "type": type,
                                        "multiplier": 1,
                                        "quality": (options && options.quality) || 1,
                                        "enableRetina": false
                                    }));
                                }, _this.prepFabricElement, {
                                    "crossOrigin": "anonymous"
                                });
                            })];
                    case 3:
                        uri = _a.sent();
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
     * Preps objects used by FabricJS before the export.
     *
     * It performs removal of embedded SVG images, since those would trigger
     * security error on older browsers. Newer browsers are fine, but they do not
     * use Fabric, so we can safely assume that if we got to this function, we
     * have an old browser on our hands.
     *
     * @ignore Exclude from docs
     * @param {any} el  Element
     * @param {any} obj Fabric element object
     * @todo Check if we can somehow apply text formatting to `<tspan>` elements that is otherwise ignored by Fabric
     */
    Export.prototype.prepFabricElement = function (el, obj) {
        // Remove in-line SVG images so they don't cause security error
        if (obj.type == "image" && obj["xlink:href"] && obj["xlink:href"].match(/^data:image\/svg\+xml/)) {
            obj.visible = false;
        }
    };
    /**
     * Converts all `<image>` tags in SVG to use data uris instead of external
     * URLs
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param  {SVGSVGElement}        el       SVG node
     * @param  {IExportImageOptions}  options  Options
     * @return {Promise<void>}                 Promise
     */
    Export.prototype.imagesToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var images, promises, count, i, image, href;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = el.querySelectorAll("image");
                        if (!images.length) return [3 /*break*/, 2];
                        promises = [];
                        // There are images, process each of them
                        for (count = images.length, i = 0; i < count; i++) {
                            image = images[i];
                            href = image.getAttributeNS(Export.XLINK, "href");
                            //let href = image.getAttribute("href");
                            if (href.indexOf("data:image") !== -1) {
                                // Ignore image if it's already in Data URI format
                            }
                            else {
                                // SVG or bitmap image?
                                if (href.indexOf(".svg") !== -1) {
                                    promises.push(this.svgToDataURI(image, options));
                                }
                                else {
                                    promises.push(this.imageToDataURI(image, options));
                                }
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * `foreignObject` elements cannot be exported. This function hides them
     * temprarily. In the future it might try to convert them to SVG to make them
     * exportable.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param  {SVGSVGElement}        el       SVG node
     * @param  {IExportImageOptions}  options  Options
     * @return {Promise<void>}                 Promise
     */
    Export.prototype.prepForeignObjects = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var objects, count, i;
            return __generator(this, function (_a) {
                objects = el.querySelectorAll("foreignObject");
                if (objects.length) {
                    // There are foreign objects, process each of them
                    for (count = objects.length, i = 0; i < count; i++) {
                        this.temporarilyRemoveObject(objects[i]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Converts an SVG `<image>` to use its data uri for `href` instead of
     * external file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param {SVGImageElement}     el       SVG element
     * @param {IExportImageOptions} options  Options
     */
    Export.prototype.imageToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var img, canvas, uri, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadNewImage(el.getAttributeNS(Export.XLINK, "href"), null, null, "anonymous")];
                    case 1:
                        // Create image
                        img = _a.sent();
                        canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        // Draw new image on it via `toDataURL`
                        canvas.getContext("2d").drawImage(img, 0, 0);
                        // Replace image `href` with data uri
                        // If we got to this point it means image has loaded, however we might
                        // still get an error with `toDataURL()`
                        try {
                            uri = canvas.toDataURL();
                            el.setAttribute("href", uri);
                            return [2 /*return*/, uri];
                        }
                        catch (e) {
                            // Give up and temporarily remove the element href temporarily
                            if (options.keepTainted !== false) {
                                /*this._removedObjects.push({
                                    "element": el,
                                    "originalHref": el.getAttributeNS(Export.XLINK, "href")
                                });
                                el.setAttributeNS(Export.XLINK, "href", "");*/
                                this.temporarilyRemoveObject(el);
                            }
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        // Give up and temporarily remove the element's href
                        if (!options || options.keepTainted !== false) {
                            /*this._removedObjects.push({
                                "element": el,
                                "originalHref": el.getAttributeNS(Export.XLINK, "href")
                            });
                            el.setAttributeNS(Export.XLINK, "href", "");*/
                            this.temporarilyRemoveObject(el);
                        }
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Converts `<image>` with external SVG source to data uri. Loads external SVG
     * file, then converts it to data uri and replaces the `xlink:href` parameter.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param {SVGImageElement}     el        An SVG element
     * @param {IExportImageOptions} options   Options
     */
    Export.prototype.svgToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var href, data, charset, uri, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        href = el.getAttributeNS(Export.XLINK, "href");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $net.load(href)];
                    case 2:
                        data = _a.sent();
                        charset = this.adapter.apply("charset", {
                            charset: "base64",
                            type: "svg",
                            options: options
                        }).charset;
                        uri = this.adapter.apply("svgToDataURI", {
                            data: "data:" + this.getContentType("svg") + ";" + charset + "," + btoa(data.response),
                            options: options
                        }).data;
                        el.setAttributeNS(Export.XLINK, "href", uri);
                        return [2 /*return*/, uri];
                    case 3:
                        e_3 = _a.sent();
                        // Disable temporarily
                        if (!options || options.keepTainted !== false) {
                            /*this._removedObjects.push({
                                "element": el,
                                "originalHref": href
                            });
                            el.setAttributeNS(Export.XLINK, "href", "");*/
                            this.temporarilyRemoveObject(el);
                        }
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Temporarily removes element from DOM, and replaces it with a dummy
     * placeholder, as well as stores it for later restoration.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param {Node} el Node
     */
    Export.prototype.temporarilyRemoveObject = function (el, placeholder) {
        // Get parent
        var parent = el.parentElement || el.parentNode;
        // Create a placeholder group element if it has not been passed in
        if (!placeholder) {
            placeholder = this.sprite.paper.add("g").node;
        }
        parent.insertBefore(placeholder, el);
        // Check if we have a textContents we can replace with
        // @todo Perhaps we should explore alternatives to creating text nodes
        // i.e. creating a text version of the HTML-based Text, just for export
        // purposes. Converting HTML into SVG is very complicated
        if (el.textContent) {
            /*let text = this.sprite.paper.add("text").node;
            text.textContent = el.textContent;
            placeholder.appendChild(text);

            // Copy properties from the removing element to the placeholder
            $dom.copyAttributes(el, placeholder);*/
        }
        // Remove the old element
        parent.removeChild(el);
        // Log removed item
        this._removedObjects.push({
            "element": el,
            "placeholder": placeholder
        });
    };
    /**
     * Restores all (possibly tainted or unsupported) objects that were
     * temporarily removed when exporting.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.restoreRemovedObjects = function () {
        var obj;
        while (obj = this._removedObjects.pop()) {
            //obj.element.setAttribute("href", obj.originalHref);
            var parent_1 = obj.placeholder.parentElement || obj.placeholder.parentNode;
            parent_1.insertBefore(obj.element, obj.placeholder);
            //parent.removeChild(obj.placeholder);
        }
    };
    /**
     * Checkes if simplified export can be used using `createObjectURL` and SVG
     * document does not contain any external images.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return {boolean} `true` if simplified export can be used
     */
    Export.prototype.simplifiedImageExport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cache, canvas, ctx, DOMURL, svg, url, img, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache = registry.getCache("simplifiedImageExport");
                        if (cache === false || cache === true) {
                            return [2 /*return*/, cache];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        canvas = document.createElement("canvas");
                        canvas.width = 1;
                        canvas.height = 1;
                        ctx = canvas.getContext("2d");
                        DOMURL = this.getDOMURL();
                        svg = new Blob([this.normalizeSVG("<g></g>", {}, 1, 1)], { type: "image/svg+xml" });
                        url = DOMURL.createObjectURL(svg);
                        return [4 /*yield*/, this.loadNewImage(url, 1, 1)];
                    case 2:
                        img = _a.sent();
                        ctx.drawImage(img, 0, 0);
                        DOMURL.revokeObjectURL(url);
                        try {
                            //let uri = canvas.toDataURL("image/png");
                            registry.setCache("simplifiedImageExport", true);
                            return [2 /*return*/, true];
                        }
                        catch (e) {
                            registry.setCache("simplifiedImageExport", false);
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        registry.setCache("simplifiedImageExport", false);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a new `<image>` element.
     *
     * @ignore Exclude from docs
     * @param  {string}                     url          URL of the image
     * @param  {number}                     width        Width (px)
     * @param  {number}                     height       Height (px)
     * @param  {string}                     crossOrigin  Cross-Origin setting
     * @return {Promise<HTMLImageElement>}               Promise
     */
    Export.prototype.loadNewImage = function (url, width, height, crossOrigin) {
        return new Promise(function (success, error) {
            // New image
            var image;
            if (width && height) {
                image = new Image(width, height);
            }
            else {
                image = new Image();
            }
            // Set crossorigin
            if (crossOrigin) {
                image.setAttribute("crossOrigin", crossOrigin);
            }
            // Rrport success on load
            image.onload = function () {
                success(image);
            };
            function onerror() {
                // Error occurred. Just in case it's the crossOrigin issue, let's try
                // stripping off this attribute and trying again
                if (crossOrigin) {
                    // Retain old uri
                    var currentHref = image.src;
                    // Set up another `onerror` to handle situations where image is not
                    // loadable at all (i.e. protected by CORS)
                    image.onerror = function () {
                        // Nope, no luck
                        error(new Error("Loading image \"" + url + "\" failed"));
                    };
                    // remove the `crossOrigin` attribute
                    image.removeAttribute("crossorigin");
                    // retry
                    image.src = "";
                    image.src = currentHref;
                }
                else {
                    error(new Error("Loading image \"" + url + "\" failed"));
                }
            }
            // Set image error handlers
            image.onabort = onerror;
            image.onerror = onerror;
            // Trigger load
            image.src = url;
        });
    };
    /**
     * Returns current DOM URL.
     *
     * @ignore Exclude from docs
     * @return {any} URL
     */
    Export.prototype.getDOMURL = function () {
        return self.URL || self.webkitURL || self;
    };
    /**
     * Returns an SVG representation of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}             type     Type of the export
     * @param {IExportSVGOptions}  options  Options
     * @return {Promise<string>}            Promise
     */
    Export.prototype.getSVG = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var width, height, font, fontSize, svg, charset, uri;
            return __generator(this, function (_a) {
                width = this.sprite.pixelWidth, height = this.sprite.pixelHeight, font = this.findFont(this.sprite.dom), fontSize = this.findFontSize(this.sprite.dom);
                svg = this.normalizeSVG(this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, font, fontSize);
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: "svg",
                    options: options
                }).charset;
                uri = this.adapter.apply("getSVG", {
                    data: "data:" + this.getContentType(type) + ";" + charset + "," + svg,
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Checks if SVG is fully formatted. Encloses in `<svg>...</svg>` if
     * necessary.
     *
     * @ignore Exclude from docs
     * @param  {string}             svg       Input SVG
     * @param  {IExportSVGOptions}  options   Options
     * @param  {number}             width     Width of the SVG viewport
     * @param  {number}             height    Height of the SVG viewport
     * @param  {string}             font      Font family to use as a base
     * @param  {string}             fontSize  Font size to use as a base
     * @return {string}                       Output SVG
     * @todo Add style params to existing <svg>
     */
    Export.prototype.normalizeSVG = function (svg, options, width, height, font, fontSize) {
        // Construct width/height params
        var dimParams = "";
        if (width) {
            dimParams += "width=\"" + width + "px\" ";
        }
        if (height) {
            dimParams += "height=\"" + height + "px\" ";
        }
        // Apply font settings
        var styleParams = "";
        if (font) {
            styleParams += "font-family: " + font.replace(/"/g, "") + ";";
        }
        if (fontSize) {
            styleParams += "font-size: " + fontSize + ";";
        }
        // Add missing <svg> enclosure
        if (!svg.match(/<svg/)) {
            svg = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg " + dimParams + " style=\"" + styleParams + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">" + svg + "</svg>";
        }
        else {
            if (dimParams !== "") {
                // Clear current params
                svg = svg.replace(/(<svg[^>]*)width="[^"]*"/, "$1");
                svg = svg.replace(/(<svg[^>]*)height="[^"]*"/, "$1");
                // Add new params
                svg = svg.replace(/(<svg)/, "$1" + dimParams);
            }
            /*if (styleParams !== "") {
                // Clear current params
                svg = svg.replace(/(<svg[^>]*)stylewidth="[^"]*"/, "$1");
                svg = svg.replace(/(<svg[^>]*)height="[^"]*"/, "$1");

                // Add new params
                svg = svg.replace(/(<svg)/, "$1" + dimParams);
            }*/
        }
        svg = this.adapter.apply("normalizeSVG", {
            data: svg,
            options: options
        }).data;
        return svg;
    };
    /**
     * Serializes an element and returns its contents.
     *
     * @ignore Exclude from docs
     * @param  {HTMLElement | SVGSVGElement}  element  An element to serialize
     * @return {string}                                A serialized XML
     */
    Export.prototype.serializeElement = function (element) {
        return new XMLSerializer().serializeToString(element);
    };
    /**
     * Returns a PDF containing chart image.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}             type     Type of the export
     * @param {IExportPDFOptions}  options  Options
     * @return {Promise<string>}            Promise
     * @async
     * @todo Account for header when calculating vertical fit
     */
    Export.prototype.getPDF = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var image, pdfmake, defaultMargins, doc, title;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getImage(options.imageFormat || "png", options)];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.pdfmake];
                    case 2:
                        pdfmake = _a.sent();
                        defaultMargins = [30, 30, 30, 30];
                        doc = {
                            pageSize: options.pageSize || "A4",
                            pageOrientation: options.pageOrientation || "portrait",
                            pageMargins: options.pageMargins || defaultMargins,
                            //header: <any>[],
                            content: []
                        };
                        title = this.adapter.apply("title", {
                            title: this.title,
                            options: options
                        }).title;
                        if (title) {
                            doc.content.push({
                                text: title,
                                fontSize: options.fontSize,
                                bold: true,
                                margin: [0, 0, 0, 15]
                            });
                        }
                        // Add page URL?
                        if (options.addURL) {
                            doc.content.push({
                                text: this.language.translate("Saved from") + ": " + document.location.href,
                                fontSize: options.fontSize,
                                margin: [0, 0, 0, 15]
                            });
                        }
                        // Add image
                        doc.content.push({
                            image: image,
                            fit: this.getPageSizeFit(doc.pageSize, doc.pageMargins)
                        });
                        // Apply adapters
                        doc = this.adapter.apply("pdfmakeDocument", {
                            doc: doc,
                            options: options
                        }).doc;
                        return [4 /*yield*/, new Promise(function (success, error) {
                                pdfmake.createPdf(doc).getDataUrl(function (uri) {
                                    success(uri);
                                });
                            })];
                    case 3: 
                    // Create PDF
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Returns fit dimensions for available page sizes.
     *
     * @ignore Exclude from docs
     * @param  {pageSizes} pageSize Page size
     * @return {number[]}           `[width, height]` in pixels
     */
    Export.prototype.getPageSizeFit = function (pageSize, margins) {
        // Check margins
        var newMargins = [0, 0, 0, 0];
        if (typeof margins == "number") {
            newMargins = [margins, margins, margins, margins];
        }
        else if (margins.length == 2) {
            newMargins = [margins[0], margins[1], margins[0], margins[1]];
        }
        else if (margins.length == 4) {
            newMargins = margins;
        }
        // Define available page sizes
        var sizes = {
            "4A0": [4767.87, 6740.79],
            "2A0": [3370.39, 4767.87],
            A0: [2383.94, 3370.39],
            A1: [1683.78, 2383.94],
            A2: [1190.55, 1683.78],
            A3: [841.89, 1190.55],
            A4: [595.28, 841.89],
            A5: [419.53, 595.28],
            A6: [297.64, 419.53],
            A7: [209.76, 297.64],
            A8: [147.40, 209.76],
            A9: [104.88, 147.40],
            A10: [73.70, 104.88],
            B0: [2834.65, 4008.19],
            B1: [2004.09, 2834.65],
            B2: [1417.32, 2004.09],
            B3: [1000.63, 1417.32],
            B4: [708.66, 1000.63],
            B5: [498.90, 708.66],
            B6: [354.33, 498.90],
            B7: [249.45, 354.33],
            B8: [175.75, 249.45],
            B9: [124.72, 175.75],
            B10: [87.87, 124.72],
            C0: [2599.37, 3676.54],
            C1: [1836.85, 2599.37],
            C2: [1298.27, 1836.85],
            C3: [918.43, 1298.27],
            C4: [649.13, 918.43],
            C5: [459.21, 649.13],
            C6: [323.15, 459.21],
            C7: [229.61, 323.15],
            C8: [161.57, 229.61],
            C9: [113.39, 161.57],
            C10: [79.37, 113.39],
            RA0: [2437.80, 3458.27],
            RA1: [1729.13, 2437.80],
            RA2: [1218.90, 1729.13],
            RA3: [864.57, 1218.90],
            RA4: [609.45, 864.57],
            SRA0: [2551.18, 3628.35],
            SRA1: [1814.17, 2551.18],
            SRA2: [1275.59, 1814.17],
            SRA3: [907.09, 1275.59],
            SRA4: [637.80, 907.09],
            EXECUTIVE: [521.86, 756.00],
            FOLIO: [612.00, 936.00],
            LEGAL: [612.00, 1008.00],
            LETTER: [612.00, 792.00],
            TABLOID: [792.00, 1224.00]
        };
        // Calculate size
        var fitSize = sizes[pageSize];
        fitSize[0] -= newMargins[0] + newMargins[2];
        fitSize[1] -= newMargins[1] + newMargins[3];
        return fitSize;
    };
    /**
     * Returns an Excel file of chart's data.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}               type     Type of the export
     * @param {IExportExcelOptions}  options  Options
     * @return {Promise<string>}              Promise
     * @async
     * @todo Handle dates
     * @todo Support for multi-sheet
     */
    Export.prototype.getExcel = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var XLSX, wbOptions, sheetName, wb, data, len, i, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.xlsx];
                    case 1:
                        XLSX = _a.sent();
                        wbOptions = this.adapter.apply("xlsxWorkbookOptions", {
                            options: {
                                bookType: "xlsx",
                                bookSST: false,
                                type: "base64"
                            }
                        }).options;
                        sheetName = this.adapter.apply("xlsxSheetName", {
                            name: this.title || this.language.translate("Data")
                        }).name;
                        wb = {
                            SheetNames: [sheetName],
                            Sheets: {}
                        };
                        data = [];
                        // Add column names?
                        if (options.addColumnNames) {
                            data.push(this.getExcelRow(this.dataFields, options));
                        }
                        // Add lines
                        for (len = this.data.length, i = 0; i < len; i++) {
                            data.push(this.getExcelRow(this.data[i], options));
                        }
                        // Create sheet and add data
                        wb.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(data);
                        uri = this.adapter.apply("getExcel", {
                            data: "data:" + this.getContentType(type) + ";base64," + XLSX.write(wb, wbOptions),
                            options: options
                        }).data;
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
     * Rertuns an array of values to be used as Excel row.
     *
     * @ignore Exclude from docs
     * @param  {any}                  row      Row data
     * @param  {IExportExcelOptions}  options  Options
     * @return {any[]}                         Array of values
     */
    Export.prototype.getExcelRow = function (row, options) {
        var _this = this;
        // Init
        var items = [];
        // Process each row item
        $object.each(row, function (key, value) {
            items.push(_this.convertDateValue(key, value, options));
        });
        return items;
    };
    /**
     * Returns chart's data formatted as CSV.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}             type     Type of the export
     * @param {IExportCSVOptions}  options  Options
     * @return {Promise<string>}            Promise
     * @async
     */
    Export.prototype.getCSV = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var csv, br, len, i, row, charset, uri;
            return __generator(this, function (_a) {
                csv = "";
                br = "";
                for (len = this.data.length, i = 0; i < len; i++) {
                    row = this.getCSVRow(this.data[i], options);
                    if (options.reverse) {
                        csv = row + br + csv;
                    }
                    else {
                        csv += br + row;
                    }
                    br = "\n";
                }
                // Add column names?
                if (options.addColumnNames) {
                    csv = this.getCSVRow(this.dataFields, options) + br + csv;
                }
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: type,
                    options: options
                }).charset;
                uri = this.adapter.apply("getCSV", {
                    data: "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(csv),
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Formats a row of CSV data.
     *
     * @ignore Exclude from docs
     * @param  {any}               row     An object holding data for the row
     * @param  {IExportCSVOptions} options Options
     * @return {string}                    Formated CSV line
     */
    Export.prototype.getCSVRow = function (row, options) {
        var _this = this;
        // Init
        var separator = options.separator || ",";
        var items = [];
        // Process each row item
        $object.each(row, function (key, value) {
            // Convert dates
            var item = _this.convertDateValue(key, value, options);
            // Cast and escape doublequotes
            item = "" + item;
            item = item.replace(/"/g, '""');
            // Enclose into double quotes
            if (options.forceQuotes || (item.search(new RegExp("\"|\n|" + separator, "g")) >= 0)) {
                item = "\"" + item + "\"";
            }
            // Add to item
            items.push(item);
        });
        return items.join(separator);
    };
    /**
     * Returns chart's data in JSON format.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}              type     Type of the export
     * @param {IExportJSONOptions}  options  Options
     * @return {Promise<string>}             Promise
     * @async
     */
    Export.prototype.getJSON = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var json, charset, uri;
            return __generator(this, function (_a) {
                json = JSON.stringify(this.data, function (key, value) {
                    if (typeof value == "object") {
                        $object.each(value, function (field, item) {
                            value[field] = _this.convertDateValue(field, item, options);
                        });
                    }
                    return value;
                }, options.indent);
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: type,
                    options: options
                }).charset;
                uri = this.adapter.apply("getJSON", {
                    data: "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(json),
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Converts the value to proper date format.
     *
     * @ignore Exclude from docs
     * @param  {string}                                  field    Field name
     * @param  {any}                                     value    Value
     * @param  {IExportCSVOptions | IExportJSONOptions}  options  Options
     * @return {any}                                              Formatted date value or unmodified value
     */
    Export.prototype.convertDateValue = function (field, value, options) {
        // Is this a timestamp?
        if (typeof value == "number" && this.isDateField(field)) {
            value = new Date(value);
        }
        if (value instanceof Date) {
            if (options.useTimestamps) {
                value = value.getTime();
            }
            else if (options.useLocale) {
                value = value.toLocaleString();
            }
            else {
                value = this.dateFormatter.format(value, this.dateFormat);
            }
        }
        return value;
    };
    /**
     * Triggers download of the file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param  {string}            uri       Data URI with file content
     * @param  {string}            fileName  File name
     * @return {Promise<boolean>}            Promise
     * @async
     */
    Export.prototype.download = function (uri, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var link, parts, contentType, decoded, chars, i, charCode, blob, parts, contentType, iframe, idoc;
            return __generator(this, function (_a) {
                //if (window.navigator.msSaveOrOpenBlob === undefined) {
                if (this.linkDownloadSupport() && !$type.hasValue(window.navigator.msSaveOrOpenBlob)) {
                    link = document.createElement("a");
                    link.download = fileName;
                    link.href = uri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                else if ($type.hasValue(window.navigator.msSaveBlob)) {
                    parts = uri.split(";");
                    contentType = parts.shift().replace(/data:/, "");
                    uri = decodeURIComponent(parts.join(";").replace(/^[^,]*,/, ""));
                    // Check if we need to Base64-decode
                    try {
                        decoded = atob(uri);
                        uri = decoded;
                    }
                    catch (e) {
                        // Error occurred, meaning string was not Base64-encoded. Do nothing.
                        return [2 /*return*/, false];
                    }
                    chars = new Array(uri.length);
                    for (i = 0; i < uri.length; ++i) {
                        charCode = uri.charCodeAt(i);
                        chars[i] = charCode;
                    }
                    blob = new Blob([new Uint8Array(chars)], { type: contentType });
                    window.navigator.msSaveBlob(blob, fileName);
                }
                else if (this.legacyIE()) {
                    parts = uri.match(/^data:(.*);[ ]*([^,]*),(.*)$/);
                    if (parts.length === 4) {
                        // Base64-encoded or text-based stuff?
                        if (parts[2] == "base64") {
                            // Base64-encoded - probably an image
                            if (parts[1].match(/^image\//)) {
                                // Yep, an image. Let's create a temporary image placeholder,
                                // so that user can use do Save As.
                                this.showModal("<img src=\"" + uri + "\" style=\"float: left; max-width: 50%; max-height: 80%; margin: 0 1em 0.5em 0; border: 1px solid #eee;\" />" +
                                    "<p>" + this.language.translate("To save the image, right-click thumbnail on the left and choose \"Save picture as...\"") +
                                    "</p>" +
                                    "<p style=\"text-align: center;\"><small>" + this.language.translate("(Press ESC to close this message)") + "</small></p>", this.language.translate("Image Export Complete"));
                            }
                        }
                        else {
                            contentType = void 0;
                            if (fileName.match(/\.svg$/)) {
                                contentType = "image/svg+xml";
                            }
                            else {
                                contentType = "text/plain";
                                fileName += ".txt";
                            }
                            iframe = document.createElement("iframe");
                            iframe.width = "1px";
                            iframe.height = "1px";
                            iframe.style.display = "none";
                            document.body.appendChild(iframe);
                            idoc = iframe.contentDocument;
                            idoc.open(contentType, "replace");
                            idoc.charset = parts[2].replace(/charset=/, "");
                            idoc.write(decodeURIComponent(parts[3]));
                            idoc.close();
                            idoc.execCommand("SaveAs", true, fileName);
                            // Destroy the iframe
                            document.body.removeChild(iframe);
                        }
                    }
                }
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Checks if the browser supports "download" attribute on links.
     *
     * @ignore Exclude from docs
     * @return {boolean} Browser supports triggering downloads?
     */
    Export.prototype.linkDownloadSupport = function () {
        // Do we have this cached?
        var cache = registry.getCache("linkDownloadSupport");
        if (cache === false || cache === true) {
            return cache;
        }
        var a = document.createElement("a");
        var res = typeof a.download !== "undefined";
        registry.setCache("linkDownloadSupport", res);
        return res;
    };
    /**
     * Checks if this is a legacy version of IE.
     *
     * @ignore Exclude from docs
     * @return {boolean} IE9 or less?
     */
    Export.prototype.legacyIE = function () {
        // Create a temporary <div> with conditional tags in it an an <i> tag.
        // Count <i>s. If there are some, we have IE9 or late on our hands.
        var div = document.createElement("div");
        div.innerHTML = "<!--[if lt IE 10]><i></i><![endif]-->";
        return div.getElementsByTagName("i").length == 1;
    };
    /**
     * Initiates print of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param {string}               data     Data URI for the image
     * @param {IExportPrintOptions}  options  Options
     * @param {string}               title    Optional title to use (uses window's title by default)
     * @return {Promise<boolean>}             Promise
     * @async
     */
    Export.prototype.print = function (data, options, title) {
        return __awaiter(this, void 0, void 0, function () {
            var scroll, states, items, len, i, item, originalTitle, img, isIOS;
            return __generator(this, function (_a) {
                scroll = document.documentElement.scrollTop || document.body.scrollTop;
                states = [];
                items = document.body.childNodes;
                for (len = items.length, i = 0; i < len; i++) {
                    item = items[i];
                    if ($dom.isElement(item)) {
                        states[i] = item.style.display;
                        item.style.display = "none";
                    }
                }
                if (title && document && document.title) {
                    originalTitle = document.title;
                    document.title = title;
                }
                img = new Image();
                img.src = data;
                img.style.maxWidth = "100%";
                document.body.appendChild(img);
                // Print
                this.setTimeout(function () {
                    window.print();
                }, 50);
                isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS && (options.delay < 1000)) {
                    options.delay = 1000;
                }
                else if (options.delay < 100) {
                    options.delay = 100;
                }
                // Delay function that resets back the document the way ot was before
                this.setTimeout(function () {
                    // Remove image
                    document.body.removeChild(img);
                    // Reset back all elements
                    for (var len = items.length, i = 0; i < len; i++) {
                        var item = items[i];
                        if ($dom.isElement(item)) {
                            item.style.display = states[i];
                        }
                    }
                    // Restore title
                    if (originalTitle) {
                        document.title = document.title;
                    }
                    // Scroll back the document the way it was before
                    document.documentElement.scrollTop = document.body.scrollTop = scroll;
                }, options.delay || 500);
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Finds a background color for the element. If element is transparent it goes
     * up the DOM hierarchy to find a parent element that does.
     *
     * @ignore Exclude from docs
     * @param  {Element}  element Element
     * @return {Color}            Color code
     */
    Export.prototype.findBackgroundColor = function (element) {
        // Check if element has styles set
        var opacity = 1, currentColor = "";
        if (element.currentStyle) {
            currentColor = element.currentStyle["background-color"];
        }
        else if (window.getComputedStyle) {
            currentColor = document.defaultView.getComputedStyle(element, null).getPropertyValue("background-color");
        }
        // Check opacity
        if (currentColor.match(/[^,]*,[^,]*,[^,]*,[ ]?0/) || currentColor == "transparent") {
            opacity = 0;
        }
        if (opacity == 0) {
            var parent_2 = element.parentElement; // || <Element>element.parentNode;
            // Completely transparent. Look for a parent
            if (parent_2) {
                return this.findBackgroundColor(parent_2);
            }
            else {
                return color("#fff");
            }
        }
        else {
            return color(currentColor, opacity);
        }
    };
    /**
     * Returns a font fmaily name for the element (directly set or
     * computed/inherited).
     *
     * @ignore Exclude from docs
     * @param  {Element}  element  Element
     * @return {string}            Font family
     */
    Export.prototype.findFont = function (element) {
        // Check if element has styles set
        var font = "";
        if (element.currentStyle) {
            font = element.currentStyle["font-family"];
        }
        else if (window.getComputedStyle) {
            font = document.defaultView.getComputedStyle(element, null).getPropertyValue("font-family");
        }
        if (!font) {
            // Completely transparent. Look for a parent
            var parent_3 = element.parentElement || element.parentNode;
            if (parent_3) {
                return this.findFont(parent_3);
            }
            else {
                return undefined;
            }
        }
        else {
            return font;
        }
    };
    /**
     * Returns a font fmaily name for the element (directly set or
     * computed/inherited).
     *
     * @ignore Exclude from docs
     * @param  {Element}  element  Element
     * @return {string}            Font family
     */
    Export.prototype.findFontSize = function (element) {
        // Check if element has styles set
        var font = "";
        if (element.currentStyle) {
            font = element.currentStyle["font-size"];
        }
        else if (window.getComputedStyle) {
            font = document.defaultView.getComputedStyle(element, null).getPropertyValue("font-size");
        }
        if (!font) {
            // Completely transparent. Look for a parent
            var parent_4 = element.parentElement || element.parentNode;
            if (parent_4) {
                return this.findFont(parent_4);
            }
            else {
                return undefined;
            }
        }
        else {
            return font;
        }
    };
    Object.defineProperty(Export.prototype, "container", {
        /**
         * @return {HTMLElement} Reference
         */
        get: function () {
            return this.adapter.apply("container", {
                container: this._container
            }).container;
        },
        /**
         * A reference to a container to be used to place [[ExportMenu]] in.
         *
         * @param {HTMLElement} value Reference
         */
        set: function (value) {
            this._container = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "sprite", {
        /**
         * @return {Sprite} Sprite
         */
        get: function () {
            return this.adapter.apply("sprite", {
                sprite: this._sprite
            }).sprite;
        },
        /**
         * A reference to [[Sprite]] to export. Can be any Sprite, including some
         * internal elements.
         *
         * @param {Sprite} value Sprite
         */
        set: function (value) {
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "data", {
        /**
         * @return {any} Data
         */
        get: function () {
            return this.adapter.apply("data", {
                data: this._data
            }).data;
        },
        /**
         * Data to export.
         *
         * @param {any} value Data
         */
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dataFields", {
        /**
         * @return {any} Field names `{ field: fieldName }`
         */
        get: function () {
            if (!this._dataFields) {
                this.generateDataFields();
            }
            return this.adapter.apply("dataFields", {
                dataFields: this._dataFields
            }).dataFields;
        },
        /**
         * Data fields in `{ field: fieldName }` format. Those are used for
         * exporting in data formats to name the columns.
         *
         * @param {any} value Field names
         */
        set: function (value) {
            this._dataFields = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dateFormatter", {
        /**
         * @return {any} A DateFormatter instance
         */
        get: function () {
            if (!this._dateFormatter) {
                this._dateFormatter = new DateFormatter();
            }
            return this.adapter.apply("dateFormatter", {
                dateFormatter: this._dateFormatter
            }).dateFormatter;
        },
        /**
         * A [[DateFormatter]] to use when formatting dates when exporting data.
         *
         * @param {any} value DateFormatter instance
         */
        set: function (value) {
            this._dateFormatter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dateFormat", {
        /**
         * @return {string} Date format
         */
        get: function () {
            return this.adapter.apply("dateFormat", {
                dateFormat: this._dateFormat
            }).dateFormat;
        },
        /**
         * A date format to use for exporting dates. Will use [[DateFormatter]]
         * format if not set.
         *
         * @param {string} value Date format
         */
        set: function (value) {
            this._dateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dateFields", {
        /**
         * @return {List<string>} Date field list
         */
        get: function () {
            if (!this._dateFields) {
                this._dateFields = new List();
            }
            return this.adapter.apply("dateFields", {
                dateFields: this._dateFields
            }).dateFields;
        },
        /**
         * A list of fields that hold date values.
         *
         * @param {List<string>} value Date field list
         */
        set: function (value) {
            this._dateFields = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates data fields out of the first row of data.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.generateDataFields = function () {
        var _this = this;
        this._dataFields = {};
        if (this.data.length) {
            var row = this.data[0];
            $object.each(row, function (key, value) {
                _this._dataFields[key] = _this.adapter.apply("dataFieldName", {
                    name: key,
                    field: key
                }).name;
            });
        }
    };
    /**
     * Cheks against `dateFields` property to determine if this field holds
     * dates.
     *
     * @ignore Exclude from docs
     * @param  {string}        field   Field name
     * @param  {IExportOptions} options Options
     * @return {boolean}               `true` if it's a date field
     */
    Export.prototype.isDateField = function (field) {
        return this.adapter.apply("isDateField", {
            isDateField: this.dateFields.contains(field),
            field: field
        }).isDateField;
    };
    /**
     * Returns proper content type for the export type.
     *
     * @param  {string}  type  Export format/type
     * @return {string}        Proper content type, i.e. "image/jpeg"
     */
    Export.prototype.getContentType = function (type) {
        var contentType = "";
        switch (type) {
            case "png":
            case "gif":
                contentType = "image/" + type;
                break;
            case "jpg":
                contentType = "image/jpeg";
                break;
            case "svg":
                contentType = "image/svg+xml";
                break;
            case "csv":
                contentType = "text/csv";
                break;
            case "json":
                contentType = "application/json";
                break;
            case "pdf":
                contentType = "application/pdf";
                break;
            case "xlsx":
                contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
        }
        return this.adapter.apply("contentType", {
            contentType: contentType,
            type: type
        }).contentType;
    };
    Object.defineProperty(Export.prototype, "filePrefix", {
        /**
         * @return {string} File prefix
         */
        get: function () {
            return this.adapter.apply("filePrefix", {
                filePrefix: this._filePrefix
            }).filePrefix;
        },
        /**
         * A file prefix to be used for all exported formats.
         *
         * Export will apply format-related extension to it. E.g. if this is set to
         * "myExport", the file name of the PNG exported image will be "myExport.png".
         *
         * @param {string} value File prefix
         */
        set: function (value) {
            this._filePrefix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "backgroundColor", {
        /**
         * @return {Color} Background color
         */
        get: function () {
            return this.adapter.apply("backgroundColor", {
                backgroundColor: this._backgroundColor
            }).backgroundColor;
        },
        /**
         * A background color to be used for exported images. If set, this will
         * override the automatically acquired background color.
         *
         * @param {Color} value Color
         */
        set: function (value) {
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "title", {
        /**
         * @return {string} Title
         */
        get: function () {
            return this.adapter.apply("title", {
                title: this._title
            }).title;
        },
        /**
         * A title to be used when printing.
         *
         * @param {string} value Title
         */
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Displays a preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     * @todo Add ability to change text
     */
    Export.prototype.showPreloader = function () {
        var preloader = this.preloader;
        if (preloader) {
            preloader.progress = 0.5;
            preloader.label.text = "...";
        }
    };
    /**
     * Hides preloader/exporting indicator
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hidePreloader = function () {
        var preloader = this.preloader;
        if (preloader) {
            preloader.progress = 1;
        }
    };
    Object.defineProperty(Export.prototype, "preloader", {
        /**
         * Returns a an instance of [[Preloader]] associated with the Sprite being
         * exported.
         *
         * @return {Preloader} Preloader
         */
        get: function () {
            return this._sprite && this._sprite.parent && this._sprite.parent.preloader ?
                this._sprite.parent.preloader :
                undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Displays a modal saying export is taking longer than expected.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.showTimeout = function () {
        this.showModal(this.adapter.apply("timeoutMessage", {
            message: this.language.translate("Export operation took longer than expected. Something might have gone wrong.")
        }).message);
    };
    /**
     * Hides preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hideTimeout = function () {
        if (this._timeoutTimeout) {
            this.removeDispose(this._timeoutTimeout);
            this._timeoutTimeout = null;
        }
        this.hideModal();
    };
    Object.defineProperty(Export.prototype, "language", {
        /**
         * @return {Language} A [[Language]] instance to be used
         */
        get: function () {
            if (!this._language) {
                this._language = new Language();
            }
            return this._language;
        },
        /**
         * A [[Language]] instance to be used for translations.
         *
         * @param {Language} value An instance of [[Language]]
         */
        set: function (value) {
            this._language = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "modal", {
        /**
         * Returns (and creates) [[Modal]].
         *
         * @ignore Exclude from docs
         * @return {Modal} Modal instance
         */
        get: function () {
            var _this = this;
            if (!this._modal) {
                this._modal = new Modal();
                // Prefix with Sprite's class name
                this._modal.adapter.add("classPrefix", function (value) {
                    value = _this.sprite.classNamePrefix + value;
                    return value;
                });
            }
            return this._modal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows [[Modal]] with specific text.
     *
     * @ignore Exclude from docs
     * @param {string} text Modal contents
     */
    Export.prototype.showModal = function (text, title) {
        // Hide previous modal and preloader
        this.hideModal();
        this.hidePreloader();
        // Create modal
        var modal = this.modal;
        modal.container = this.sprite.svgContainer;
        modal.content = text;
        modal.readerTitle = title;
        modal.show();
    };
    /**
     * Hides modal window if one's currently open.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hideModal = function () {
        if (this._modal) {
            this.modal.hide();
        }
    };
    /**
     * Loads Fabric dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return {Promise<any>} Instance of Fabric
     * @async
     */
    Export.prototype._fabric = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import(/* webpackChunkName: "fabric" */ "../../fabric/fabric")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Object.defineProperty(Export.prototype, "fabric", {
        /**
         * Returns Fabric instance.
         *
         * @ignore Exclude from docs
         * @return {Promise<any>} Instance of Fabric
         */
        get: function () {
            return this._fabric();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads pdfmake dynamic module
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return {Promise<any>} Instance of pdfmake
     * @async
     */
    Export.prototype._pdfmake = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a, pdfmake, vfs_fonts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            import(/* webpackChunkName: "pdfmake" */ "pdfmake/build/pdfmake.js"),
                            import(/* webpackChunkName: "pdfmake" */ "pdfmake/build/vfs_fonts.js")
                        ])];
                    case 1:
                        a = _a.sent();
                        pdfmake = a[0];
                        vfs_fonts = a[1];
                        pdfmake.vfs = vfs_fonts.pdfMake.vfs;
                        return [2 /*return*/, pdfmake];
                }
            });
        });
    };
    Object.defineProperty(Export.prototype, "pdfmake", {
        /**
         * Returns pdfmake instance.
         *
         * @ignore Exclude from docs
         * @return {Promise<any>} Instance of pdfmake
         */
        get: function () {
            return this._pdfmake();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads xlsx dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return {Promise<any>} Instance of pdfmake
     * @async
     */
    Export.prototype._xlsx = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import(/* webpackChunkName: "xlsx" */ "xlsx")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Object.defineProperty(Export.prototype, "xlsx", {
        /**
         * Returns xlsx instance.
         *
         * @ignore Exclude from docs
         * @return {Promise<any>} Instance of pdfmake
         */
        get: function () {
            return this._xlsx();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets options for a format.
     *
     * @type {Key}
     */
    Export.prototype.setFormatOptions = function (type, options) {
        this._formatOptions.setKey(type, options);
    };
    /**
     * Returns current options for a format.
     */
    Export.prototype.getFormatOptions = function (type) {
        return this._formatOptions.getKey(type);
    };
    /**
 * Disables interactivity on parent chart.
 */
    Export.prototype._disableMouse = function () {
        if (!$type.hasValue(this._spriteMouseEnabled)) {
            this._spriteMouseEnabled = this.sprite.mouseEnabled;
        }
        this.sprite.mouseEnabled = false;
    };
    /**
     * Releases temporarily disabled mouse on parent chart.
     */
    Export.prototype._releaseMouse = function () {
        if ($type.hasValue(this._spriteMouseEnabled)) {
            this.sprite.mouseEnabled = this._spriteMouseEnabled;
        }
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param {object}  config  Config
     */
    Export.prototype.processConfig = function (config) {
        registry.registeredClasses["ExportMenu"] = ExportMenu;
        if (config) {
            // Set up menu
            if ($type.hasValue(config.menu) && !$type.hasValue(config.menu.type)) {
                config.menu.type = "ExportMenu";
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * XLINK namespace definition.
     *
     * @ignore Exclude from docs
     * @type {string}
     */
    Export.XLINK = "http://www.w3.org/1999/xlink";
    return Export;
}(Validatable));
export { Export };
//# sourceMappingURL=Export.js.map