/**
 * Axis break module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Axis, AxisDataItem } from "./Axis";
import { SpriteEventDispatcher, AMEvent } from "../../core/Sprite";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { IWavedShape } from "../../core/defs/IWavedShape";
import { List } from "../../core/utils/List";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisBreak]].
 */
export interface IAxisBreakProperties extends IContainerProperties {
    /**
     * [number description]
     *
     * @todo Description
     * @type {number}
     */
    breakSize?: number;
    /**
     * Starting value.
     *
     * @type {number}
     */
    startValue?: number;
    /**
     * End value.
     * @type {number}
     */
    endValue?: number;
}
/**
 * Defines events for [[AxisBreak]].
 */
export interface IAxisBreakEvents extends IContainerEvents {
}
/**
 * Defines [[AxisBreak]] adapters.
 *
 * @see {@link Adapter}
 */
export interface IAxisBreakAdapters extends IContainerAdapters, IAxisBreakProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" on axes.
 *
 * @see {@link IAxisBreakEvents} for a list of available events
 * @see {@link IAxisBreakAdapters} for a list of available Adapters
 * @important
 */
export declare class AxisBreak extends Container {
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IAxisBreakProperties}
     */
    _properties: IAxisBreakProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IAxisBreakAdapters}
     */
    _adapter: IAxisBreakAdapters;
    /**
     * Event dispatcher.
     *
     * @type {SpriteEventDispatcher<AMEvent<AxisBreak, IAxisBreakEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<AxisBreak, IAxisBreakEvents>>;
    /**
     * Defines the type of the Axis this break is used for.
     *
     * @ignore Exclude from docs
     * @type {Axis}
     */
    _axisType: Axis;
    /**
     * Reference to parent Axis.
     *
     * @type {MutableValueDisposer}
     */
    protected _axis: MutableValueDisposer<this["_axisType"]>;
    /**
     * A reference to starting line element.
     *
     * @type {IWavedShape}
     */
    protected _startLine: IWavedShape;
    /**
     * A reference to ending line element.
     *
     * @type {IWavedShape}
     */
    protected _endLine: IWavedShape;
    /**
     * A reference to fill shape.
     *
     * @type {IWavedShape}
     */
    protected _fillShape: IWavedShape;
    /**
     * A list of axis data items which fall within this break.
     *
     * @type {List<AxisDataItem>}
     */
    dataItems: List<AxisDataItem>;
    /**
     * Adjusted start value.
     *
     * Start and end values need to be adjusted so that they do not overlap with
     * adjacent breaks.
     *
     * @type {number}
     */
    adjustedStartValue: number;
    /**
     * Adjusted end value.
     *
     * Start and end values need to be adjusted so that they do not overlap with
     * adjacent breaks.
     *
     * @type {number}
     */
    adjustedEndValue: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * @return {IWavedShape} Element
     */
    /**
     * An element used for the starting line of the break.
     *
     * @param {IWavedShape}  sprite  Element
     */
    startLine: IWavedShape;
    /**
     * @return {IWavedShape} Element
     */
    /**
     * An element used for the end line of the break.
     *
     * @param {IWavedShape} sprite Element
     */
    endLine: IWavedShape;
    /**
     * @return {IWavedShape} Element
     */
    /**
     * An element used for fill of the break.
     *
     * @param {IWavedShape} sprite Element
     */
    fillShape: IWavedShape;
    /**
     * Adds a break element (e.g. lines, fill) to the break, which is
     * [[Container]].
     *
     * @ignore Exclude from docs
     * @param {IWavedShape} sprite Element to add
     */
    addBreakSprite(sprite: IWavedShape): void;
    /**
     * @return {Axis} Axis
     */
    /**
     * An Axis this Break is associated with.
     *
     * @param {Axis}  axis  Axis
     */
    axis: this["_axisType"];
    /**
     * @return {number} [description]
     */
    /**
     * [breakSize description]
     *
     * @todo Description
     * @param {number} value [description]
     */
    breakSize: number;
    /**
     * Returns pixel coordinates of axis break's start.
     *
     * @return {IPoint} Start point
     */
    readonly startPoint: IPoint;
    /**
     * Returns pixel coordinates of axis break's end.
     *
     * @return {IPoint} End point
     */
    readonly endPoint: IPoint;
    /**
     * Returns a relative position at which axis break starts.
     *
     * This is a calculated position, meaning it shows relative position of the
     * break after break is applied.
     *
     * @return {number} Start position
     */
    readonly startPosition: number;
    /**
     * Returns a relative position at which axis break ends.
     *
     * This is a calculated position, meaning it shows relative position of the
     * break after break is applied.
     *
     * @return {number} End position
     */
    readonly endPosition: number;
    /**
     * Draws the axis break.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * @return {number} Starting value
     */
    /**
     * A starting value for the break.
     *
     * @param {number}  value  Starting value
     */
    startValue: number;
    /**
     * @return {number} End value
     */
    /**
     * An end value for the break.
     *
     * @param {number}  value  End value
     */
    endValue: number;
}
