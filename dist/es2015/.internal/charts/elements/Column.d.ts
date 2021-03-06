/**
 * Module that defines everything related to building Columns.
 * It is a container which has column element which is a RoundedRectangle.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { SpriteEventDispatcher, AMEvent } from "../../core/Sprite";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Column]].
 */
export interface IColumnProperties extends IContainerProperties {
}
/**
 * Defines events for [[Column]].
 */
export interface IColumnEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Column]].
 *
 * @see {@link Adapter}
 */
export interface IColumnAdapters extends IContainerAdapters, IColumnProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates Columns.
 *
 * @see {@link IColumnEvents} for a list of available events
 * @see {@link IColumnAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
export declare class Column extends Container {
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IColumnProperties}
     */
    _properties: IColumnProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IColumnAdapters}
     */
    _adapter: IColumnAdapters;
    /**
     * Event dispatcher.
     *
     * @type {SpriteEventDispatcher<AMEvent<Column, IColumnEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<Column, IColumnEvents>>;
    /**
     * column element
     * @type {RoundedRectangle}
     */
    column: RoundedRectangle;
    /**
     * Constructor
     */
    constructor();
    createAssets(): void;
    validate(): void;
    copyFrom(source: this): void;
}
