import { Building } from "@/engine/renderable/entity/Building";
import { Vehicle } from "@/engine/renderable/entity/Vehicle";
import { Terrain } from "@/engine/renderable/entity/Terrain";
import { Overlay } from "@/engine/renderable/entity/Overlay";
import { Smudge } from "@/engine/renderable/entity/Smudge";
import { AnimationType } from "@/engine/renderable/entity/building/AnimationType";
import { Infantry } from "@/engine/renderable/entity/Infantry";
import { PipOverlay } from "@/engine/renderable/entity/PipOverlay";
import { Aircraft } from "@/engine/renderable/entity/Aircraft";
import { TransientAnim } from "@/engine/renderable/entity/TransientAnim";
import { Projectile } from "@/engine/renderable/entity/Projectile";
import { ObjectType } from "@/engine/type/ObjectType";
import { HarvesterPlugin } from "@/engine/renderable/entity/plugin/HarvesterPlugin";
import { Anim } from "@/engine/renderable/entity/Anim";
import { MoveSoundFxPlugin } from "@/engine/renderable/entity/plugin/MoveSoundFxPlugin";
import { VehicleDisguisePlugin } from "@/engine/renderable/entity/plugin/VehicleDisguisePlugin";
import { ChronoSparkleFxPlugin } from "@/engine/renderable/entity/plugin/ChronoSparkleFxPlugin";
import { TntFxPlugin } from "@/engine/renderable/entity/plugin/TntFxPlugin";
import { MindControlLinkPlugin } from "@/engine/renderable/entity/plugin/MindControlLinkPlugin";
import { InfantryDisguisePlugin } from "@/engine/renderable/entity/plugin/InfantryDisguisePlugin";
import { PsychicDetectPlugin } from "@/engine/renderable/entity/building/PsychicDetectPlugin";
import { TrailerSmokePlugin } from "@/engine/renderable/entity/plugin/TrailerSmokePlugin";
import { DamageSmokePlugin } from "@/engine/renderable/entity/plugin/DamageSmokePlugin";
import { LocomotorType } from "@/game/type/LocomotorType";
import { ShipWakeTrailPlugin } from "@/engine/renderable/entity/plugin/ShipWakeTrailPlugin";
import { ObjectCloakPlugin } from "@/engine/renderable/entity/plugin/ObjectCloakPlugin";
import { Debris } from "@/engine/renderable/entity/Debris";
import { ShpAggregator } from "@/engine/renderable/builder/ShpAggregator";
interface Position {
    x: number;
    y: number;
}
interface GameEntity {
    art: {
        paletteType: string;
        customPaletteName?: string;
    };
    rules: {
        moveSound?: string;
        damageParticleSystems: any[];
        locomotor: LocomotorType;
    };
    type: string;
    mindControllerTrait?: any;
    psychicDetectorTrait?: any;
    harvesterTrait?: any;
    disguiseTrait?: any;
    tntChargeTrait?: any;
    isAircraft(): boolean;
    isProjectile(): boolean;
    isDebris(): boolean;
    isTechno(): boolean;
    isUnit(): boolean;
    isBuilding(): boolean;
    isVehicle(): boolean;
    isInfantry(): boolean;
    isTerrain(): boolean;
    isOverlay(): boolean;
    isSmudge(): boolean;
}
interface LocalPlayer {
}
interface UnitSelection {
    getOrCreateSelectionModel(entity: GameEntity): any;
}
interface Alliances {
}
interface Rules {
    general: {
        paradrop: any;
    };
    audioVisual: {
        chronoSparkle1: any;
    };
    combatDamage: {
        ivanIconFlickerRate: number;
    };
}
interface Art {
    getObject(name: string, type: ObjectType): any;
}
interface MapRenderable {
    terrainLayer?: any;
    overlayLayer?: any;
    smudgeLayer?: any;
}
interface ImageFinder {
}
interface Palettes {
    get(name: string): any;
}
interface Voxels {
}
interface VoxelAnims {
}
interface Theater {
    getPalette(paletteType: string, customPaletteName?: string): any;
    animPalette: any;
    isoPalette: any;
}
interface Camera {
}
interface Lighting {
}
interface LightingDirector {
}
interface DebugWireframes {
}
interface DebugText {
}
interface GameSpeed {
}
interface WorldSound {
}
interface Strings {
}
interface FlyerHelperOpt {
}
interface HiddenObjectsOpt {
}
interface VxlBuilderFactory {
}
interface BuildingImageDataCache {
}
interface Plugin {
    update?(delta: number): void;
    onCreate?(renderableManager: any): void;
    onRemove?(): void;
    dispose?(): void;
}
interface RenderableEntity {
    registerPlugin?(plugin: Plugin): void;
}
export class RenderableFactory {
    private localPlayer: LocalPlayer;
    private unitSelection: UnitSelection;
    private alliances: Alliances;
    private rules: any;
    private art: Art;
    private mapRenderable: MapRenderable | null;
    private imageFinder: any;
    private palettes: Palettes;
    private voxels: any;
    private voxelAnims: any;
    private theater: Theater;
    private camera: any;
    private lighting: any;
    private lightingDirector: any;
    private debugWireframes: any;
    private debugText: any;
    private gameSpeed: any;
    private worldSound: any;
    private strings: any;
    private flyerHelperOpt: any;
    private hiddenObjectsOpt: any;
    private vxlBuilderFactory: any;
    private buildingImageDataCache: BuildingImageDataCache;
    private useSpriteBatching: boolean;
    private useMeshInstancing: boolean;
    private bridgeImageCache: Map<any, any>;
    constructor(localPlayer: LocalPlayer, unitSelection: UnitSelection, alliances: Alliances, rules: any, art: Art, mapRenderable: MapRenderable | null, imageFinder: any, palettes: Palettes, voxels: any, voxelAnims: any, theater: Theater, camera: any, lighting: any, lightingDirector: any, debugWireframes: any, debugText: any, gameSpeed: any, worldSound: any, strings: any, flyerHelperOpt: any, hiddenObjectsOpt: any, vxlBuilderFactory: any, buildingImageDataCache: BuildingImageDataCache, useSpriteBatching: boolean = false, useMeshInstancing: boolean = false) {
        this.localPlayer = localPlayer;
        this.unitSelection = unitSelection;
        this.alliances = alliances;
        this.rules = rules;
        this.art = art;
        this.mapRenderable = mapRenderable;
        this.imageFinder = imageFinder;
        this.palettes = palettes;
        this.voxels = voxels;
        this.voxelAnims = voxelAnims;
        this.theater = theater;
        this.camera = camera;
        this.lighting = lighting;
        this.lightingDirector = lightingDirector;
        this.debugWireframes = debugWireframes;
        this.debugText = debugText;
        this.gameSpeed = gameSpeed;
        this.worldSound = worldSound;
        this.strings = strings;
        this.flyerHelperOpt = flyerHelperOpt;
        this.hiddenObjectsOpt = hiddenObjectsOpt;
        this.vxlBuilderFactory = vxlBuilderFactory;
        this.buildingImageDataCache = buildingImageDataCache;
        this.useSpriteBatching = useSpriteBatching;
        this.useMeshInstancing = useMeshInstancing;
        this.bridgeImageCache = new Map();
    }
    createTransientAnim(name: string, callback?: any): TransientAnim {
        const artObject = this.art.getObject(name, ObjectType.Animation);
        return new TransientAnim(name, artObject, { x: 0, y: 0 }, this.imageFinder as any, this.theater, this.camera, this.debugWireframes, this.gameSpeed, this.useSpriteBatching, callback, this.worldSound as any);
    }
    createAnim(name: string): Anim {
        const artObject = this.art.getObject(name, ObjectType.Animation);
        return new Anim(name, artObject, { x: 0, y: 0 }, this.imageFinder as any, this.theater, this.camera, this.debugWireframes, this.gameSpeed, this.useSpriteBatching, undefined, this.worldSound as any);
    }
    create(entity: any): any {
        const gameEntity = entity as any;
        const localPlayerRef = { value: this.localPlayer };
        let palette = this.theater.getPalette(gameEntity.art.paletteType, gameEntity.art.customPaletteName);
        const plugins: any[] = [];
        if (entity.isAircraft() ||
            entity.isProjectile() ||
            entity.isDebris()) {
            plugins.push(new TrailerSmokePlugin(gameEntity, this.art, this.theater, this.imageFinder as any, this.gameSpeed));
        }
        if (entity.isTechno()) {
            palette = palette.clone();
            const selectionModel = this.unitSelection.getOrCreateSelectionModel(gameEntity);
            const pipOverlay = new PipOverlay(this.rules.general.paradrop, this.rules.audioVisual, gameEntity, localPlayerRef, this.alliances, selectionModel, this.imageFinder as any, this.palettes.get("palette.pal"), this.camera, this.strings as any, this.flyerHelperOpt as any, this.hiddenObjectsOpt as any, this.debugText, (name: string) => this.createAnim(name), this.useSpriteBatching, this.useMeshInstancing);
            if (entity.isUnit()) {
                const moveSound = gameEntity.rules.moveSound;
                if (moveSound && this.worldSound) {
                    plugins.push(new MoveSoundFxPlugin(gameEntity, moveSound, this.worldSound));
                }
            }
            plugins.push(new ChronoSparkleFxPlugin(gameEntity, this.rules.audioVisual.chronoSparkle1));
            if (gameEntity.mindControllerTrait) {
                plugins.push(new MindControlLinkPlugin(gameEntity, selectionModel, this.alliances, localPlayerRef));
            }
            let renderable: any;
            if (entity.isBuilding()) {
                const animPalette = this.theater.animPalette;
                const isoPalette = this.theater.isoPalette;
                renderable = new Building(gameEntity, selectionModel, this.rules, this.art, this.imageFinder as any, this.theater, this.voxels, this.voxelAnims as any, palette, animPalette, isoPalette, this.camera, this.lighting, this.debugWireframes, this.gameSpeed, this.vxlBuilderFactory, this.useSpriteBatching, new ShpAggregator(), this.buildingImageDataCache, pipOverlay, this.worldSound, AnimationType.BUILDUP);
                if (gameEntity.psychicDetectorTrait) {
                    plugins.push(new PsychicDetectPlugin(gameEntity, gameEntity.psychicDetectorTrait, localPlayerRef, this.camera));
                }
            }
            else if (entity.isVehicle()) {
                renderable = new Vehicle(gameEntity, this.rules, this.art, this.imageFinder as any, this.theater, this.voxels, this.voxelAnims, palette, this.camera, this.lighting, this.debugWireframes, this.gameSpeed, selectionModel, this.vxlBuilderFactory, this.useSpriteBatching, pipOverlay, this.worldSound);
                if (gameEntity.rules.damageParticleSystems.length) {
                    plugins.push(new DamageSmokePlugin(gameEntity, this.art, this.theater, this.imageFinder as any, this.gameSpeed));
                }
                if (gameEntity.rules.locomotor === LocomotorType.Ship ||
                    gameEntity.rules.locomotor === LocomotorType.Hover) {
                    plugins.push(new ShipWakeTrailPlugin(gameEntity, this.rules, this.art, this.theater, this.imageFinder as any, this.gameSpeed));
                }
                if (gameEntity.harvesterTrait && this.mapRenderable) {
                    plugins.push(new HarvesterPlugin(gameEntity, gameEntity.harvesterTrait));
                }
                if (gameEntity.disguiseTrait) {
                    plugins.push(new VehicleDisguisePlugin(gameEntity, gameEntity.disguiseTrait, localPlayerRef, this.alliances, renderable, this.art, this.imageFinder as any, this.theater, this.camera, this.lighting, this.gameSpeed, this.useSpriteBatching));
                }
            }
            else if (entity.isInfantry()) {
                renderable = new Infantry(gameEntity, this.rules, this.art, this.imageFinder as any, this.theater, palette, this.camera, this.lighting, this.debugWireframes, this.gameSpeed, selectionModel, this.useSpriteBatching, this.useMeshInstancing, pipOverlay, this.worldSound);
                if (gameEntity.disguiseTrait) {
                    plugins.push(new InfantryDisguisePlugin(gameEntity, gameEntity.disguiseTrait, localPlayerRef, this.alliances, renderable, this.art, this.gameSpeed));
                }
            }
            else if (entity.isAircraft()) {
                renderable = new Aircraft(gameEntity, this.rules, this.voxels as any, this.voxelAnims as any, palette, this.lighting, this.debugWireframes, this.gameSpeed, selectionModel, this.vxlBuilderFactory as any, this.useSpriteBatching, pipOverlay);
            }
            else {
                throw new Error("Unhandled game object type " + gameEntity.type);
            }
            if (gameEntity.tntChargeTrait) {
                plugins.push(new TntFxPlugin(gameEntity, gameEntity.tntChargeTrait, this.rules.combatDamage.ivanIconFlickerRate, renderable, this.imageFinder as any, this.art, this.alliances, localPlayerRef, this.worldSound, (name: string) => this.createAnim(name)));
            }
            plugins.push(new ObjectCloakPlugin(gameEntity, localPlayerRef, this.alliances, renderable));
            plugins.forEach((plugin) => renderable.registerPlugin(plugin));
            return renderable;
        }
        if (entity.isTerrain()) {
            return new Terrain(gameEntity, this.mapRenderable?.terrainLayer, this.imageFinder as any, palette, this.camera, this.lighting, this.debugWireframes, this.gameSpeed, this.useSpriteBatching);
        }
        if (entity.isOverlay()) {
            return new Overlay(gameEntity, this.rules, this.art, this.imageFinder as any, palette, this.camera, this.lighting, this.debugWireframes, this.bridgeImageCache, this.mapRenderable?.overlayLayer, this.useSpriteBatching);
        }
        if (entity.isProjectile()) {
            const projectile = new Projectile(gameEntity, this.rules, this.imageFinder as any, this.voxels, this.voxelAnims, this.theater, palette, this.palettes.get("palette.pal"), this.camera, this.gameSpeed, this.lighting, this.lightingDirector, this.vxlBuilderFactory, this.useSpriteBatching, this.useMeshInstancing);
            plugins.forEach((plugin) => projectile.registerPlugin(plugin));
            return projectile;
        }
        if (entity.isSmudge()) {
            return new Smudge(gameEntity, this.imageFinder as any, palette, this.camera, this.lighting, this.debugWireframes, this.mapRenderable?.smudgeLayer);
        }
        if (entity.isDebris()) {
            const debris = new Debris(gameEntity, this.rules as any, this.imageFinder as any, this.voxels as any, this.voxelAnims as any, palette, this.camera, this.lighting, this.gameSpeed, this.vxlBuilderFactory as any, this.useSpriteBatching);
            plugins.forEach((plugin) => debris.registerPlugin(plugin as any));
            return debris;
        }
        throw new Error("Not implemented");
    }
}
