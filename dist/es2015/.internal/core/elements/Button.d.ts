/**
 * Functionality for drawing simple buttons.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { Sprite, SpriteEventDispatcher, AMEvent } from "../Sprite";
import { Label } from "./Label";
import { RoundedRectangle } from "../elements/RoundedRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Button]].
 */
export interface IButtonProperties extends IContainerProperties {
    /**
     * Icon (if available) position - left or right.
     */
    iconPosition?: "left" | "right";
    /**
     * Icon sprite
     */
    icon?: Sprite;
}
/**
 * Defines events for [[Button]].
 */
export interface IButtonEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Button]].
 *
 * @see {@link Adapter}
 */
export interface IButtonAdapters extends IContainerAdapters, IButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Button class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IButtonEvents} for a list of available events
 * @see {@link IButtonAdapters} for a list of available Adapters
 */
export declare class Button extends Container {
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IButtonProperties}
     */
    _properties: IButtonProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IButtonAdapters}
     */
    _adapter: IButtonAdapters;
    /**
     * Event dispatcher.
     *
     * @type {SpriteEventDispatcher<AMEvent<Button, IButtonEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<Button, IButtonEvents>>;
    /**
     * Icon reference.
     *
     * @type {Sprite}
     */
    protected _icon: Sprite;
    /**
     * [[Label]] element for button content.
     *
     * @type {Label}
     */
    protected _label: Label;
    /**
     * A type for background.
     *
     * @ignore Exclude from docs
     * @type {RoundedRectangle}
     */
    _background: RoundedRectangle;
    /**
     * Constructor
     */
    constructor();
    /**
     * @return {Sprite} Icon Sprite
     */
    /**
     * A [[Sprite]] to be used as an icon on button.
     *
     * @param {Sprite} icon Icon Sprite
     */
    icon: Sprite;
    /**
     * @return {"left" | "right"} Icon position
     */
    /**
     * Icon position: "left" or "right".
     *
     * @default "left"
     * @param {"left" | "right"}  position  Icon position
     */
    iconPosition: "left" | "right";
    /**
     * @return {Label} Label element
     */
    /**
     * [[Label]] element to be used for text.
     *
     * @param {Label}  label element
     */
    label: Label;
    /**
     * Creates a background element for the button.
     *
     * @ignore Exclude from docs
     * @return {RoundedRectangle} Background element
     */
    createBackground(): this["_background"];
}
