import * as LiangBarsky from "liang-barsky";
import * as GameVehicle from "@/game/gameobject/Vehicle";
import * as Coords from "@/game/Coords";
import * as WithPosition from "@/engine/renderable/WithPosition";
import * as DebugUtils from "@/engine/gfx/DebugUtils";
import * as ShpRenderable from "@/engine/renderable/ShpRenderable";
import * as ImageFinder from "@/engine/ImageFinder";
import { MissingImageError } from "@/engine/ImageFinder";
import * as MapSpriteTranslation from "@/engine/renderable/MapSpriteTranslation";
import * as Animation from "@/engine/Animation";
import * as AnimProps from "@/engine/AnimProps";
import * as IniSection from "@/data/IniSection";
import * as SimpleRunner from "@/engine/animation/SimpleRunner";
import * as MathUtils from "@/util/math";
import * as ObjectType from "@/engine/type/ObjectType";
import * as SpeedType from "@/game/type/SpeedType";
import * as HighlightAnimRunner from "@/engine/renderable/entity/HighlightAnimRunner";
import * as VeteranLevel from "@/game/gameobject/unit/VeteranLevel";
import * as HarvesterTrait from "@/game/gameobject/trait/HarvesterTrait";
import * as DeathType from "@/game/gameobject/common/DeathType";
import * as FacingUtil from "@/game/gameobject/unit/FacingUtil";
import * as ZoneType from "@/game/gameobject/unit/ZoneType";
import * as InvulnerableAnimRunner from "@/engine/renderable/entity/InvulnerableAnimRunner";
import * as GameSpeed from "@/game/GameSpeed";
import * as BoxIntersectObject3D from "@/engine/renderable/entity/BoxIntersectObject3D";
import * as RotorHelper from "@/engine/renderable/entity/unit/RotorHelper";
import * as ExtraLightHelper from "@/engine/renderable/entity/unit/ExtraLightHelper";
import * as DebugRenderable from "@/engine/renderable/DebugRenderable";
import * as GfxMathUtils from "@/engine/gfx/MathUtils";
import * as THREE from "three";
const o = LiangBarsky;
const a = GameVehicle;
const S = Coords;
const y = WithPosition;
const n = DebugUtils;
const p = ShpRenderable;
const m = ImageFinder;
const f = MapSpriteTranslation;
const w = Animation;
const C = AnimProps;
const E = IniSection;
const x = SimpleRunner;
const h = MathUtils;
const i = ObjectType;
const s = SpeedType;
const T = HighlightAnimRunner;
const O = VeteranLevel;
const r = HarvesterTrait;
const l = DeathType;
const c = FacingUtil;
const M = ZoneType;
const v = InvulnerableAnimRunner;
const u = GameSpeed;
const d = BoxIntersectObject3D;
const g = RotorHelper;
const A = ExtraLightHelper;
const b = DebugRenderable;
const R = GfxMathUtils;
let P: number;
let I: any;
let k: any;
P = Math.PI / 4;
enum SquidGrabAnimType {
    Grab = 0,
    Shake1 = 1,
    Shake2 = 2
}
I = SquidGrabAnimType;
interface GameObjectInterface {
    id: string;
    rules: any;
    art: any;
    owner: {
        color: any;
    };
    tile: any;
    tileElevation: number;
    direction: number;
    spinVelocity: number;
    zone: any;
    isMoving: boolean;
    isFiring: boolean;
    isDestroyed: boolean;
    position: {
        worldPosition: any;
    };
    moveTrait: {
        velocity: any;
    };
    invulnerableTrait: {
        isActive(): boolean;
    };
    warpedOutTrait: {
        isActive(): boolean;
    };
    cloakableTrait?: {
        isCloaked(): boolean;
    };
    submergibleTrait?: {
        isSubmerged(): boolean;
    };
    rocking?: {
        facing: number;
        factor: number;
    };
    parasiteableTrait?: {
        isInfested(): boolean;
        getParasite(): {
            rules: {
                organic: boolean;
            };
            owner: {
                color: any;
            };
        } | null;
    };
    tilterTrait?: {
        tilt: {
            yaw: number;
            pitch: number;
        };
    };
    turretTrait?: {
        facing: number;
    };
    turretNo: number;
    veteranLevel: any;
    harvesterTrait?: any;
    airSpawnTrait?: {
        availableSpawns: number;
    };
    explodes: boolean;
    deathType: any;
    isSinker: boolean;
    isVehicle(): boolean;
    getUiName(): string;
    name: string;
}
export class Vehicle {
    gameObject: GameObjectInterface;
    rules: any;
    imageFinder: any;
    voxels: any;
    voxelAnims: any;
    palette: any;
    camera: any;
    lighting: any;
    debugFrame: any;
    gameSpeed: any;
    selectionModel: any;
    vxlBuilderFactory: any;
    useSpriteBatching: boolean;
    pipOverlay: any;
    worldSound: any;
    rotorSpeeds: number[] = [];
    vxlBuilders: any[] = [];
    highlightAnimRunner: any;
    invulnAnimRunner: any;
    plugins: any[] = [];
    objectRules: any;
    objectArt: any;
    label: string;
    paletteRemaps: any[];
    lastOwnerColor: any;
    baseVxlExtraLight: any;
    baseShpExtraLight: any;
    vxlExtraLight: any;
    shpExtraLight: any;
    withPosition: any;
    target?: any;
    posObj?: any;
    tiltObj?: any;
    dirWrapObj?: any;
    mainObj?: any;
    rockingTiltObj?: any;
    bodyVxlBuilder?: any;
    mainVxl?: any;
    noSpawnAltVxl?: any;
    harvesterAltVxl?: any;
    turret?: any;
    allTurrets?: any[];
    barrel?: any;
    rotors?: any[];
    shpRenderable?: any;
    placeholder?: any;
    shpAnimRunner?: any;
    chargeTurretRunner?: any;
    currentTurretIdx: number = 0;
    lastDirection?: number;
    lastDirectionDelta?: number;
    lastVeteranLevel?: any;
    lastElevation?: number;
    lastInvulnerable?: boolean;
    lastWarpedOut?: boolean;
    lastCloaked?: boolean;
    lastSubmerged?: boolean;
    lastRockingFacing?: number;
    lastSquidGrabbed?: boolean;
    lastTilt?: {
        yaw: number;
        pitch: number;
    };
    lastTurretFacing?: number;
    lastMoving?: boolean;
    lastFiring?: boolean;
    destroyStartTime?: number;
    sinkWakeAnims: any[] = [];
    squidGrabAnim?: any;
    rockingStartTime?: number;
    rockingFactor?: number;
    rockingPoint?: any;
    rockingAxis?: any;
    renderableManager?: any;
    ambientSound?: any;
    resolveObjectRemove?: () => void;
    constructor(e, t, i, r, s, a, n, o, l, c, h, u, d, g, p, m, f) {
        (this.gameObject = e),
            (this.rules = t),
            (this.imageFinder = r),
            (this.voxels = a),
            (this.voxelAnims = n),
            (this.palette = o),
            (this.camera = l),
            (this.lighting = c),
            (this.debugFrame = h),
            (this.gameSpeed = u),
            (this.selectionModel = d),
            (this.vxlBuilderFactory = g),
            (this.useSpriteBatching = p),
            (this.pipOverlay = m),
            (this.worldSound = f),
            (this.rotorSpeeds = []),
            (this.vxlBuilders = []),
            (this.highlightAnimRunner = new T.HighlightAnimRunner(this.gameSpeed)),
            (this.invulnAnimRunner = new v.InvulnerableAnimRunner(this.gameSpeed)),
            (this.plugins = []),
            (this.objectRules = e.rules),
            (this.objectArt = e.art),
            (this.label = "vehicle_" + this.objectRules.name),
            (this.paletteRemaps = [...this.rules.colors.values()].map((e) => this.palette.clone().remap(e))),
            this.palette.remap(this.gameObject.owner.color),
            (this.lastOwnerColor = this.gameObject.owner.color),
            this.updateBaseLight(),
            (this.vxlExtraLight = new THREE.Vector3().copy(this.baseVxlExtraLight)),
            (this.shpExtraLight = new THREE.Vector3().copy(this.baseShpExtraLight)),
            (this.withPosition = new y.WithPosition());
    }
    updateBaseLight() {
        (this.baseShpExtraLight = this.lighting
            .compute(this.objectArt.lightingType, this.gameObject.tile, this.gameObject.tileElevation)
            .addScalar(-1)
            .addScalar(this.rules.audioVisual.extraUnitLight)),
            (this.baseVxlExtraLight = new THREE.Vector3().setScalar(1 + this.lighting.computeNoAmbient(this.objectArt.lightingType, this.gameObject.tile, this.gameObject.tileElevation) + this.rules.audioVisual.extraUnitLight));
    }
    registerPlugin(e) {
        this.plugins.push(e);
    }
    updateLighting() {
        this.plugins.forEach((e) => e.updateLighting?.()),
            this.updateBaseLight(),
            this.vxlExtraLight.copy(this.baseVxlExtraLight),
            this.shpExtraLight.copy(this.baseShpExtraLight);
    }
    get3DObject() {
        return this.target;
    }
    create3DObject() {
        let e = this.get3DObject();
        e ||
            ((e = new d.BoxIntersectObject3D(new THREE.Vector3(1, 1 / 3, 1).multiplyScalar(S.Coords.LEPTONS_PER_TILE))),
                (e.name = this.label),
                (e.userData.id = this.gameObject.id),
                (this.target = e),
                (e.matrixAutoUpdate = !1),
                (this.withPosition.matrixUpdate = !0),
                this.withPosition.applyTo(this),
                this.createObjects(e),
                this.vxlBuilders.forEach((e) => e.setExtraLight(this.vxlExtraLight)),
                this.shpRenderable?.setExtraLight(this.shpExtraLight),
                this.pipOverlay &&
                    (this.pipOverlay.create3DObject(),
                        this.posObj?.add(this.pipOverlay.get3DObject())));
    }
    updateClippingPlanes(e, t = !1) {
        if (t ||
            (this.objectRules.naval && !this.objectRules.underwater)) {
            var i = S.Coords.tileHeightToWorld(e);
            let t = [new THREE.Plane(new THREE.Vector3(0, 1, 0), -i)];
            this.vxlBuilders.forEach((e) => e.setClippingPlanes(t));
        }
    }
    getIntersectTarget() {
        return this.target;
    }
    getUiName() {
        var e = this.plugins.reduce((e, t) => t.getUiNameOverride?.() ?? e, void 0);
        return void 0 !== e ? e : this.gameObject.getUiName();
    }
    setPosition(e) {
        this.withPosition.setPosition(e.x, e.y, e.z);
    }
    getPosition() {
        return this.withPosition.getPosition();
    }
    highlight() {
        this.plugins.some((e) => e.shouldDisableHighlight?.()) ||
            (this.highlightAnimRunner.animation.getState() !==
                w.AnimationState.RUNNING &&
                this.highlightAnimRunner.animate(2));
    }
    update(i, r = 0) {
        this.plugins.forEach((e) => e.update(i)),
            this.pipOverlay?.update(i),
            this.gameObject.veteranLevel !== this.lastVeteranLevel &&
                (this.gameObject.veteranLevel === O.VeteranLevel.Elite &&
                    void 0 !== this.lastVeteranLevel &&
                    this.highlightAnimRunner.animate(30),
                    (this.lastVeteranLevel = this.gameObject.veteranLevel));
        const elevation = this.gameObject.tile.z + this.gameObject.tileElevation;
        const elevationChanged = void 0 === this.lastElevation || this.lastElevation !== elevation;
        elevationChanged &&
            ((this.lastElevation = elevation),
                this.updateBaseLight(),
                this.updateClippingPlanes(this.gameObject.tile.z));
        const isInvulnerable = this.gameObject.invulnerableTrait.isActive();
        const invulnerableChanged = isInvulnerable !== this.lastInvulnerable;
        this.lastInvulnerable = isInvulnerable;
        const highlightNeedsUpdate = this.highlightAnimRunner.shouldUpdate();
        highlightNeedsUpdate && this.highlightAnimRunner.tick(i),
            isInvulnerable && invulnerableChanged && this.invulnAnimRunner.animate(),
            this.invulnAnimRunner.shouldUpdate() &&
                this.invulnAnimRunner.tick(i);
        const isWarpedOut = this.gameObject.warpedOutTrait.isActive();
        const warpedOutChanged = isWarpedOut !== this.lastWarpedOut;
        this.lastWarpedOut = isWarpedOut;
        const isCloaked = this.gameObject.cloakableTrait?.isCloaked();
        const cloakedChanged = isCloaked !== this.lastCloaked;
        this.lastCloaked = isCloaked;
        const isSubmerged = this.gameObject.submergibleTrait?.isSubmerged();
        const submergedChanged = isSubmerged !== this.lastSubmerged;
        if (((this.lastSubmerged = isSubmerged), warpedOutChanged || cloakedChanged || submergedChanged)) {
            const opacity = isWarpedOut || isCloaked || isSubmerged ? 0.5 : 1;
            this.shpRenderable?.setOpacity(opacity),
                this.shpRenderable?.setFlat(!!isSubmerged),
                this.vxlBuilders.forEach((e) => {
                    e.setOpacity(opacity), e.setShadow(!isSubmerged);
                }),
                this.placeholder?.setOpacity(opacity);
        }
        if (elevationChanged || invulnerableChanged || isInvulnerable || highlightNeedsUpdate) {
            const invulnerableLight = isInvulnerable ? this.invulnAnimRunner.getValue() : 0;
            const highlightLight = (highlightNeedsUpdate ? this.highlightAnimRunner.getValue() : 0) || invulnerableLight;
            const ambientIntensity = this.lighting.getAmbientIntensity();
            A.ExtraLightHelper.multiplyVxl(this.vxlExtraLight, this.baseVxlExtraLight, ambientIntensity, highlightLight),
                A.ExtraLightHelper.multiplyShp(this.shpExtraLight, this.baseShpExtraLight, highlightLight);
        }
        if (this.gameObject.isDestroyed && this.resolveObjectRemove) {
            if ((this.squidGrabAnim &&
                (this.posObj?.remove(this.squidGrabAnim.get3DObject()),
                    this.squidGrabAnim.dispose(),
                    (this.squidGrabAnim = void 0)),
                this.destroyStartTime || (this.destroyStartTime = i),
                this.isSinker())) {
                const sinkProgress = (i - this.destroyStartTime) / 3e3;
                const sinkFinished = 1 <= sinkProgress;
                sinkFinished
                    ? (this.mainObj.visible = !1)
                    : (this.objectRules.naval &&
                        (this.mainObj.rotation.x = (Math.PI / 4) * sinkProgress),
                        (this.mainObj.position.y =
                            -16 * S.Coords.ISO_WORLD_SCALE * sinkProgress),
                        (this.mainObj.position.z =
                            8 * S.Coords.ISO_WORLD_SCALE * sinkProgress),
                        this.mainObj.updateMatrix());
                let wakesFinished = !1;
                this.sinkWakeAnims.forEach((e) => e.update(i)),
                    this.sinkWakeAnims.filter((e) => !e.isAnimFinished())
                        .length ||
                        (this.sinkWakeAnims.forEach((e) => this.get3DObject().remove(e.get3DObject())),
                            (this.sinkWakeAnims.length = 0),
                            (wakesFinished = !0)),
                    sinkFinished && wakesFinished && this.resolveObjectRemove();
            }
        }
        else if (!this.gameObject.warpedOutTrait.isActive()) {
            let direction = (Math.floor(this.gameObject.direction +
                this.gameObject.spinVelocity * r) +
                360) %
                360;
            const directionChanged = direction !== this.lastDirection;
            directionChanged &&
                void 0 !== this.lastDirection &&
                this.objectArt.isVoxel &&
                this.gameObject.zone === M.ZoneType.Air &&
                (() => {
                    const directionDelta = direction - this.lastDirection;
                    const previousDirectionDelta = this.lastDirectionDelta;
                    if (void 0 !== previousDirectionDelta &&
                        Math.abs(directionDelta) < 2 &&
                        Math.abs(previousDirectionDelta) < 2 &&
                        Math.sign(directionDelta) !== Math.sign(previousDirectionDelta)) {
                        direction = this.lastDirection;
                    }
                    else {
                        this.lastDirectionDelta = directionDelta;
                    }
                })(),
                (this.lastDirection = direction);
            const ownerColor = this.gameObject.owner.color;
            this.lastOwnerColor !== ownerColor &&
                (this.palette.remap(ownerColor),
                    (this.lastOwnerColor = ownerColor),
                    this.vxlBuilders.forEach((e) => e.setPalette(this.palette)),
                    this.shpRenderable?.setPalette(this.palette),
                    this.placeholder?.setPalette(this.palette));
            const isMoving = this.gameObject.isMoving ||
                (!this.objectArt.isVoxel &&
                    !!this.gameObject.spinVelocity);
            const isFiring = this.gameObject.isFiring;
            const movingChanged = void 0 === this.lastMoving || this.lastMoving !== isMoving;
            const firingChanged = void 0 === this.lastFiring || this.lastFiring !== isFiring;
            if (0 < r && (isMoving || movingChanged)) {
                const velocity = this.gameObject.moveTrait.velocity.clone();
                const movementDelta = velocity.multiplyScalar(r);
                const interpolatedPosition = movementDelta.add(this.gameObject.position.worldPosition);
                this.setPosition(interpolatedPosition);
            }
            (movingChanged || firingChanged) &&
                ((this.lastMoving = isMoving),
                    (this.lastFiring = isFiring),
                    this.objectArt.isVoxel ||
                        this.updateShapeAnimation(isMoving, isFiring));
            let turretChanged;
            if (this.gameObject.rules.isChargeTurret) {
                if (firingChanged && isFiring) {
                    this.chargeTurretRunner = new x.SimpleRunner();
                    const animProps = new C.AnimProps(new E.IniSection("dummy"), this.gameObject.rules.turretCount);
                    (animProps.reverse = !0), (animProps.rate = 5);
                    const chargeTurretAnimation = new w.Animation(animProps, this.gameSpeed);
                    this.chargeTurretRunner.animation = chargeTurretAnimation;
                }
                this.chargeTurretRunner?.tick(i);
                const chargeTurretFrame = this.chargeTurretRunner?.getCurrentFrame() ?? 0;
                (turretChanged = chargeTurretFrame !== this.currentTurretIdx),
                    (this.currentTurretIdx = chargeTurretFrame),
                    this.chargeTurretRunner?.animation.getState() ===
                        w.AnimationState.STOPPED &&
                        (this.chargeTurretRunner = void 0);
            }
            else
                (turretChanged = this.gameObject.turretNo !== this.currentTurretIdx),
                    (this.currentTurretIdx = this.gameObject.turretNo);
            this.objectArt.isVoxel
                ? (this.updateVxlRotation(direction, directionChanged),
                    this.updateBodyVxl(),
                    (() => {
                        const rockingFacing = this.gameObject.rocking?.facing;
                        const rockingFacingChanged = rockingFacing !== this.lastRockingFacing;
                        this.lastRockingFacing = rockingFacing;
                        if (rockingFacingChanged && void 0 !== rockingFacing) {
                            const rockingFactor = this.gameObject.rocking.factor;
                            0 < rockingFactor &&
                                this.startRocking(rockingFacing, rockingFactor, i);
                        }
                        const squidGrabbed = !!(!(!this.gameObject.parasiteableTrait?.isInfested() ||
                            !this.gameObject.parasiteableTrait.getParasite()
                                ?.rules.organic));
                        const squidGrabChanged = squidGrabbed !== this.lastSquidGrabbed;
                        this.lastSquidGrabbed = squidGrabbed;
                        this.updateRocking(i, squidGrabbed),
                            this.gameObject.turretTrait &&
                                1 < this.objectRules.turretCount &&
                                turretChanged &&
                                this.updateActiveTurret(this.currentTurretIdx),
                            this.updateSquidGrab(i, squidGrabbed, squidGrabChanged, directionChanged, direction, rockingFacing, rockingFacingChanged);
                    })())
                : this.shpAnimRunner &&
                    (this.shpAnimRunner.tick(i),
                        this.updateShapeFrame(direction, isMoving, isFiring));
        }
    }
    updateVxlRotation(e: number, t: boolean) {
        const r_tilt = this.gameObject.tilterTrait?.tilt ?? {
            yaw: 0,
            pitch: 0,
        };
        if (!this.lastTilt ||
            r_tilt.pitch !== this.lastTilt.pitch ||
            r_tilt.yaw !== this.lastTilt.yaw ||
            t) {
            this.lastTilt = r_tilt;
            this.tiltObj.rotation.y = THREE.MathUtils.degToRad(r_tilt.yaw);
            this.tiltObj.rotation.x = THREE.MathUtils.degToRad(r_tilt.pitch);
            this.tiltObj.updateMatrix();
            this.dirWrapObj.rotation.y = THREE.MathUtils.degToRad(e - r_tilt.yaw);
            this.dirWrapObj.updateMatrix();
        }
        if (this.turret && this.gameObject.turretTrait) {
            const i = Math.floor(this.gameObject.turretTrait.facing);
            const turretChanged = i !== this.lastTurretFacing;
            this.lastTurretFacing = i;
            if (turretChanged || t) {
                const turretRotation = THREE.MathUtils.degToRad(i - e);
                this.turret.rotation.y = turretRotation;
                this.turret.updateMatrix();
                if (this.barrel) {
                    this.barrel.rotation.y = turretRotation;
                    this.barrel.updateMatrix();
                }
            }
        }
        this.rotors?.forEach((rotor, rotorIndex) => {
            (this.rotorSpeeds[rotorIndex] =
                g.RotorHelper.computeRotationStep(this.gameObject, this.rotorSpeeds[rotorIndex] ?? 0, this.objectArt.rotors[rotorIndex])),
                this.rotorSpeeds[rotorIndex] &&
                    (rotor.rotateOnAxis(this.objectArt.rotors[rotorIndex].axis, this.rotorSpeeds[rotorIndex]),
                        rotor.updateMatrix());
        });
    }
    startRocking(i, r, s) {
        if (this.bodyVxlBuilder) {
            (this.rockingStartTime = s), (this.rockingFactor = r);
            const aabb = this.bodyVxlBuilder.getLocalBoundingBox();
            if (!aabb)
                return;
            let e = new THREE.Box2(new THREE.Vector2(aabb.min.x, aabb.min.y), new THREE.Vector2(aabb.max.x, aabb.max.y));
            var n = THREE.MathUtils.degToRad(c.FacingUtil.toWorldDeg(i));
            let tmp = new THREE.Vector2();
            let t = new THREE.Vector2(10, 0)
                .rotateAround(new THREE.Vector2(), n)
                .setLength(e.getSize(tmp).length() + 1);
            let arr: any = t.toArray();
            const clip: any = (o as any).default || (o as any);
            try {
                clip([0, 0], arr, [e.min.x, e.min.y, e.max.x, e.max.y]);
            }
            catch { }
            this.rockingPoint = new THREE.Vector3(arr[0], 0, arr[1]);
            const perp = t
                .clone()
                .rotateAround(new THREE.Vector2(), -Math.PI / 2)
                .normalize();
            this.rockingAxis = new THREE.Vector3(perp.x, 0, perp.y);
        }
    }
    updateRocking(t, i) {
        if (this.rockingStartTime) {
            var r = t - this.rockingStartTime;
            let e = this.rockingFactor;
            i ||
                (e *= 1 - Math.min(1, this.gameObject.rules.weight / 5));
            var s = r || e
                ? Math.min(1, ((r /
                    ((a.ROCKING_TICKS /
                        u.GameSpeed.BASE_TICKS_PER_SECOND) *
                        1e3)) *
                    this.gameSpeed.value) /
                    e)
                : 0, r = P * e * (1 - Math.pow(2 * (s - 0.5), 2));
            this.rockingTiltObj.position.set(0, 0, 0),
                this.rockingTiltObj.rotation.set(0, 0, 0),
                this.rockingTiltObj.scale.set(1, 1, 1),
                R.MathUtils.rotateObjectAboutPoint(this.rockingTiltObj, this.rockingPoint, this.rockingAxis, r),
                this.rockingTiltObj.updateMatrix(),
                (1 !== s && 0 !== e) || (this.rockingStartTime = void 0);
        }
    }
    updateSquidGrab(e, t, i, r, s, a, n) {
        var o;
        if ((i &&
            (this.squidGrabAnim &&
                (this.posObj?.remove(this.squidGrabAnim.get3DObject()),
                    this.squidGrabAnim.dispose(),
                    (this.squidGrabAnim = void 0)),
                t &&
                    ((this.squidGrabAnim =
                        this.renderableManager.createAnim("SQDG", (e) => {
                            (e.extraOffset = {
                                x: 0,
                                y: -S.Coords.ISO_TILE_SIZE / 4,
                            }),
                                e.setExtraLight(this.shpExtraLight);
                        }, !0)),
                        this.squidGrabAnim.remapColor(this.gameObject.parasiteableTrait.getParasite().owner
                            .color),
                        this.squidGrabAnim.create3DObject(),
                        this.posObj?.add(this.squidGrabAnim.get3DObject()))),
            t &&
                (r || i) &&
                this.updateSquidGrabAnim(this.squidGrabAnim.getAnimProps(), s, I.Grab),
            t &&
                n &&
                a &&
                ((o = 0 < a ? I.Shake1 : I.Shake2),
                    this.updateSquidGrabAnim(this.squidGrabAnim.getAnimProps(), s, o),
                    this.squidGrabAnim.reset()),
            t && n && !a)) {
            var l = this.rules.combatDamage.splashList;
            for (let e = 0; e < 3; e++) {
                var c = l[h.getRandomInt(0, l.length - 1)];
                this.renderableManager.createTransientAnim(c, (e) => {
                    let t = this.withPosition.getPosition().clone();
                    var i = {
                        x: h.getRandomInt(-S.Coords.ISO_TILE_SIZE / 2, S.Coords.ISO_TILE_SIZE / 2) * S.Coords.ISO_WORLD_SCALE,
                        y: h.getRandomInt(-S.Coords.ISO_TILE_SIZE / 2, S.Coords.ISO_TILE_SIZE / 2) * S.Coords.ISO_WORLD_SCALE,
                    };
                    e.setPosition(t.add(new THREE.Vector3(i.x, 0, i.y)));
                });
            }
        }
        this.squidGrabAnim?.update(e);
    }
    updateShapeAnimation(t, i) {
        if (this.shpAnimRunner) {
            let e = this.shpAnimRunner.animation.props;
            var r;
            i
                ? ((e.loopEnd = this.objectArt.firingFrames - 1),
                    (e.rate = C.AnimProps.defaultRate / 2))
                : t || this.objectRules.naval
                    ? ((e.loopEnd = this.objectArt.walkFrames - 1),
                        (r =
                            this.objectRules.naval && !t
                                ? this.objectRules.idleRate
                                : this.objectRules.walkRate),
                        (e.rate = C.AnimProps.defaultRate / r))
                    : (e.loopEnd = this.objectArt.standingFrames - 1),
                this.shpAnimRunner.animation.rewind();
        }
    }
    updateShapeFrame(t, i, r) {
        if (this.shpRenderable && this.shpAnimRunner) {
            let e;
            var s = this.objectArt.facings, a = Math.round((((45 - t + 360) % 360) / 360) * s) % s, s = this.shpAnimRunner.animation.getCurrentFrame();
            (e = r
                ? this.objectArt.startFiringFrame +
                    this.objectArt.firingFrames * a +
                    s
                : i || this.objectRules.naval
                    ? this.objectArt.startWalkFrame +
                        this.objectArt.walkFrames * a +
                        s
                    : this.objectArt.startStandFrame +
                        this.objectArt.standingFrames * a +
                        s),
                this.shpRenderable.setFrame(e);
        }
    }
    updateSquidGrabAnim(e, t, i) {
        var r = Math.round((((360 - t) % 360) / 360) * 8) % 8;
        (e.start = 10 * r + 80 * i),
            (e.end = 10 * r + 9 + 80 * i),
            (e.loopStart = e.start),
            (e.loopEnd = e.end),
            (e.loopCount = 0),
            (e.rate =
                10 /
                    (a.ROCKING_TICKS /
                        u.GameSpeed.BASE_TICKS_PER_SECOND /
                        (this.rockingFactor ?? 1)));
    }
    createObjects(t) {
        if (this.debugFrame.value) {
            let e = n.DebugUtils.createWireframe({ width: 1, height: 1 }, 1);
            e.translateX(-S.Coords.getWorldTileSize() / 2),
                e.translateZ(-S.Coords.getWorldTileSize() / 2),
                t.add(e);
        }
        let e = (this.tiltObj = new THREE.Object3D());
        (e.matrixAutoUpdate = !1), (e.rotation.order = "YXZ");
        let i = (this.dirWrapObj = new THREE.Object3D());
        i.matrixAutoUpdate = !1;
        var r = (this.mainObj = this.createMainObject());
        let s = (this.rockingTiltObj = new THREE.Object3D());
        (s.matrixAutoUpdate = !1),
            (s.rotation.order = "YXZ"),
            s.add(r),
            i.add(s),
            e.add(i);
        let a = (this.posObj = new THREE.Object3D());
        (a.matrixAutoUpdate = !1), a.add(e), t.add(a);
    }
    computeSpriteAnchorOffset(e) {
        var t = this.objectArt.getDrawOffset();
        return { x: e.x + t.x, y: e.y + t.y };
    }
    createMainObject() {
        let n = new THREE.Object3D();
        if (((n.matrixAutoUpdate = !1), this.objectArt.isVoxel)) {
            var o = !this.objectArt.noHva, e = this.objectArt.imageName.toLowerCase(), t = e + ".vxl", r = this.voxels.get(t);
            if (r) {
                var s = o ? this.voxelAnims.get(e + ".hva") : void 0;
                let i = (this.bodyVxlBuilder =
                    this.vxlBuilderFactory.create(r, s, this.paletteRemaps, this.palette));
                this.vxlBuilders.push(i);
                s = this.mainVxl = i.build();
                n.add(s),
                    this.objectArt.rotors &&
                        (this.rotors = this.objectArt.rotors.map((e) => {
                            var t = i.getSection(e.name);
                            if (!t)
                                throw new Error(`Vehicle "${this.objectRules.name}" VXL section "${e.name}" not found`);
                            return t;
                        }));
            }
            else
                console.warn(`VXL missing for vehicle ${this.objectRules.name}. Vxl file ${t} not found. `),
                    n.add(this.createPlaceholder());
            if (this.objectRules.spawns &&
                this.objectRules.noSpawnAlt) {
                let i = e + "wo.vxl";
                var a = this.voxels.get(i);
                if (a) {
                    var l = o
                        ? this.voxelAnims.get(i.replace(".vxl", ".hva"))
                        : void 0;
                    let e = this.vxlBuilderFactory.create(a, l, this.paletteRemaps, this.palette);
                    this.vxlBuilders.push(e);
                    let t = (this.noSpawnAltVxl = e.build());
                    (t.visible = !1), n.add(t);
                }
                else
                    console.warn(`<${this.gameObject.name}>: Couldn't find noSpawnAlt image "${i}"`);
            }
            if (this.gameObject.harvesterTrait &&
                this.objectRules.unloadingClass) {
                var c = this.rules.hasObject(this.objectRules.unloadingClass, i.ObjectType.Vehicle)
                    ? this.rules
                        .getObject(this.objectRules.unloadingClass, i.ObjectType.Vehicle)
                        .imageName.toLowerCase()
                    : void 0, a = c ? this.voxels.get(c + ".vxl") : void 0;
                if (a) {
                    l = o ? this.voxelAnims.get(c + ".hva") : void 0;
                    let e = this.vxlBuilderFactory.create(a, l, this.paletteRemaps, this.palette);
                    this.vxlBuilders.push(e);
                    var g = (this.harvesterAltVxl = e.build());
                    (g.visible = !1), n.add(g);
                }
                else
                    console.warn(`<${this.gameObject.name}>: Couldn't find UnloadingClass image "${c}.vxl"`);
            }
            if (this.gameObject.turretTrait) {
                c = this.objectArt.turretOffset;
                let t = n;
                if (c) {
                    let e = new THREE.Object3D();
                    (e.matrixAutoUpdate = !1),
                        (e.position.z = -c),
                        e.updateMatrix(),
                        n.add(e),
                        (t = e);
                }
                let r = [];
                for (let a = 0; a < this.objectRules.turretCount; ++a) {
                    let i = e + `tur${a || ""}.vxl`;
                    var h = this.voxels.get(i);
                    if (h) {
                        var u = o
                            ? this.voxelAnims.get(i.replace(".vxl", ".hva"))
                            : void 0;
                        let e = this.vxlBuilderFactory.create(h, u, this.paletteRemaps, this.palette);
                        this.vxlBuilders.push(e);
                        let t = e.build();
                        (t.visible = a === this.gameObject.turretNo),
                            r.push(t);
                    }
                    else
                        console.warn(`<${this.gameObject.name}>: Missing turret file "${i}"`),
                            r.push(void 0);
                }
                (this.currentTurretIdx = this.gameObject.turretNo),
                    (this.allTurrets = r);
                let i;
                1 < r.length
                    ? ((i = this.turret = new THREE.Object3D()),
                        (i.matrixAutoUpdate = !1),
                        r.forEach((e) => e && i.add(e)))
                    : (i = this.turret = r[0]),
                    i && t.add(i);
                let s = e + "barl.vxl";
                c = this.voxels.get(s);
                if (c) {
                    var d = o
                        ? this.voxelAnims.get(s.replace(".vxl", ".hva"))
                        : void 0;
                    let e = this.vxlBuilderFactory.create(c, d, this.paletteRemaps, this.palette);
                    this.vxlBuilders.push(e);
                    var g = (this.barrel = e.build());
                    t.add(g);
                }
            }
        }
        else {
            const spriteTranslation = new f.MapSpriteTranslation(1, 1);
            const { spriteOffset, anchorPointWorld } = spriteTranslation.compute();
            const drawOffset = this.computeSpriteAnchorOffset(spriteOffset);
            let image;
            try {
                image = this.imageFinder.findByObjectArt(this.objectArt);
            }
            catch (e) {
                if (!(e instanceof MissingImageError))
                    throw e;
                console.warn(`<${this.gameObject.name}>: ` + e.message);
            }
            if (image) {
                let shpRenderable = (this.shpRenderable = p.ShpRenderable.factory(image, this.palette, this.camera, drawOffset, this.objectArt.hasShadow));
                shpRenderable.setBatched(this.useSpriteBatching),
                    this.useSpriteBatching &&
                        shpRenderable.setBatchPalettes(this.paletteRemaps),
                    shpRenderable.create3DObject(),
                    n.add(shpRenderable.get3DObject()),
                    (n.position.x = anchorPointWorld.x),
                    (n.position.z = anchorPointWorld.y),
                    n.updateMatrix();
                let animProps = new C.AnimProps(new E.IniSection("dummy"), image);
                animProps.loopCount = -1;
                const shpAnimation = new w.Animation(animProps, this.gameSpeed);
                (this.shpAnimRunner = new x.SimpleRunner()),
                    (this.shpAnimRunner.animation = shpAnimation);
            }
            else
                n.add(this.createPlaceholder());
        }
        return n;
    }
    createPlaceholder() {
        return ((this.placeholder = new b.DebugRenderable({ width: 0.5, height: 0.5 }, this.objectArt.height, this.palette, { centerFoundation: !0 })),
            this.placeholder.setBatched(this.useSpriteBatching),
            this.useSpriteBatching &&
                this.placeholder.setBatchPalettes(this.paletteRemaps),
            this.placeholder.create3DObject(),
            this.placeholder.get3DObject());
    }
    updateActiveTurret(i) {
        this.allTurrets.forEach((e, t) => {
            e && (e.visible = t === i);
        });
    }
    updateBodyVxl() {
        var e = !!this.noSpawnAltVxl &&
            !this.gameObject.airSpawnTrait.availableSpawns, t = !!this.harvesterAltVxl &&
            !!this.gameObject.harvesterTrait &&
            [
                r.HarvesterStatus.PreparingToUnload,
                r.HarvesterStatus.Unloading,
            ].includes(this.gameObject.harvesterTrait.status);
        this.noSpawnAltVxl && (this.noSpawnAltVxl.visible = e),
            this.harvesterAltVxl && (this.harvesterAltVxl.visible = t),
            this.mainVxl && (this.mainVxl.visible = !e && !t);
    }
    isSinker() {
        return (this.gameObject.zone === M.ZoneType.Water &&
            this.gameObject.isSinker);
    }
    onCreate(t) {
        (this.renderableManager = t),
            this.plugins.forEach((e) => e.onCreate(t)),
            this.objectRules.ambientSound &&
                (this.ambientSound = this.worldSound?.playEffect(this.objectRules.ambientSound, this.gameObject));
    }
    onRemove(t) {
        if (((this.renderableManager = void 0),
            this.plugins.forEach((e) => e.onRemove(t)),
            this.ambientSound?.stop(),
            this.gameObject.isDestroyed &&
                this.gameObject.isVehicle() &&
                this.get3DObject())) {
            if (this.gameObject.deathType === l.DeathType.Temporal)
                return;
            if (this.gameObject.deathType === l.DeathType.None)
                return;
            if (this.gameObject.deathType === l.DeathType.Crush)
                return;
            if (!this.isSinker() ||
                this.objectRules.underwater ||
                (this.gameObject.deathType !== l.DeathType.Sink &&
                    this.objectRules.speedType === s.SpeedType.Hover)) {
                if (this.objectRules.underwater &&
                    this.objectRules.organic)
                    return;
                if (!this.objectRules.explosion.length)
                    return;
                if (this.gameObject.explodes &&
                    this.objectRules.deathWeapon)
                    return;
                var e = this.objectRules.explosion, e = e[h.getRandomInt(0, e.length - 1)];
                return void t.createTransientAnim(e, (e) => e.setPosition(this.withPosition.getPosition()));
            }
            if (this.isSinker()) {
                var i = this.rules.audioVisual.wake;
                this.sinkWakeAnims = [];
                for (let e = 0; e < 5; e++) {
                    let e = t.createAnim(i, void 0, !0);
                    var r = {
                        x: h.getRandomInt(-15, 15) * S.Coords.ISO_WORLD_SCALE,
                        y: h.getRandomInt(-15, 15) * S.Coords.ISO_WORLD_SCALE,
                    };
                    e.setPosition(new THREE.Vector3(r.x, 0, r.y)),
                        this.sinkWakeAnims.push(e),
                        e.create3DObject(),
                        this.get3DObject().add(e.get3DObject());
                }
                this.gameObject.rules.naval ||
                    this.updateClippingPlanes(this.gameObject.tile.z, !0);
            }
            return new Promise<void>((resolve) => (this.resolveObjectRemove = resolve));
        }
    }
    dispose() {
        this.plugins.forEach((e) => e.dispose()),
            this.pipOverlay?.dispose(),
            this.shpRenderable?.dispose(),
            this.vxlBuilders.forEach((e) => e.dispose()),
            this.sinkWakeAnims?.forEach((e) => e.dispose()),
            this.squidGrabAnim?.dispose(),
            this.placeholder?.dispose();
    }
}
