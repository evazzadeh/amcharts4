/**
 * Resize button module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Button, IButtonProperties, IButtonAdapters, IButtonEvents } from "./Button";
import { SpriteEventDispatcher, AMEvent } from "../Sprite";
import { Orientation } from "../defs/Orientation";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ResizeButton]].
 */
export interface IResizeButtonProperties extends IButtonProperties {
}
/**
 * Defines events for [[ResizeButton]] for [[ResizeButton]].
 */
export interface IResizeButtonEvents extends IButtonEvents {
}
/**
 * Defines adapters for [[ResizeButton]].
 *
 * @see {@link Adapter}
 */
export interface IResizeButtonAdapters extends IButtonAdapters, IResizeButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a draggable resize/grip button.
 *
 * @see {@link IResizeButtonEvents} for a list of available events
 * @see {@link IResizeButtonAdapters} for a list of available Adapters
 */
export declare class ResizeButton extends Button {
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IResizeButtonProperties}
     */
    _properties: IResizeButtonProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IResizeButtonAdapters}
     */
    _adapter: IResizeButtonAdapters;
    /**
     * Event dispacther.
     *
     * @type {SpriteEventDispatcher<AMEvent<ResizeButton, IResizeButtonEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<ResizeButton, IResizeButtonEvents>>;
    /**
     * Orientation of the resize direction.
     *
     * @deprecated Not used
     * @type {Orientation}
     */
    protected _orientation: Orientation;
    /**
     * Constructor
     */
    constructor();
    /**
     * Use for setting of direction (orientation) of the resize button.
     *
     * Available options: "horizontal", "vertical".
     *
     * @param {Orientation} value Orientation
     */
    orientation: Orientation;
}
