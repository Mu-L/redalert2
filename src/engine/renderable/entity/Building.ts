import * as ShpBuilder from "@/engine/renderable/builder/ShpBuilder";
import * as DamageType from "@/engine/renderable/entity/building/DamageType";
import * as AnimationType from "@/engine/renderable/entity/building/AnimationType";
import * as OverlayUtils from "@/engine/gfx/OverlayUtils";
import * as GameObjectBuilding from "@/game/gameobject/Building";
import * as Animation from "@/engine/Animation";
import * as wallTypes from "@/game/map/wallTypes";
import * as Coords from "@/game/Coords";
import * as math from "@/util/math";
import * as AnimProps from "@/engine/AnimProps";
import * as WithPosition from "@/engine/renderable/WithPosition";
import * as ShpRenderable from "@/engine/renderable/ShpRenderable";
import * as ImageFinder from "@/engine/ImageFinder";
import { MissingImageError } from "@/engine/ImageFinder";
import * as DebugUtils from "@/engine/gfx/DebugUtils";
import * as MapSpriteTranslation from "@/engine/renderable/MapSpriteTranslation";
import * as BuildingAnimArtProps from "@/engine/renderable/entity/building/BuildingAnimArtProps";
import * as typeGuard from "@/util/typeGuard";
import * as HighlightAnimRunner from "@/engine/renderable/entity/HighlightAnimRunner";
import * as TechnoRules from "@/game/rules/TechnoRules";
import * as AttackTrait from "@/game/gameobject/trait/AttackTrait";
import * as SideType from "@/game/SideType";
import * as FactoryTrait from "@/game/gameobject/trait/FactoryTrait";
import * as UnitRepairTrait from "@/game/gameobject/trait/UnitRepairTrait";
import * as DeathType from "@/game/gameobject/common/DeathType";
import * as InvulnerableAnimRunner from "@/engine/renderable/entity/InvulnerableAnimRunner";
import * as BuildingShpHelper from "@/engine/renderable/entity/building/BuildingShpHelper";
import * as ExtraLightHelper from "@/engine/renderable/entity/unit/ExtraLightHelper";
import * as AlphaRenderable from "@/engine/renderable/AlphaRenderable";
import * as DebugRenderable from "@/engine/renderable/DebugRenderable";
import * as MathUtils from "@/engine/gfx/MathUtils";
import * as THREE from "three";
const d = ShpBuilder;
const p = DamageType;
const A = AnimationType;
const s = OverlayUtils;
const m = GameObjectBuilding;
const f = Animation;
const r = wallTypes;
const g = Coords;
const u = math;
const y = AnimProps;
const R = WithPosition;
const T = ShpRenderable;
const P = ImageFinder;
const v = DebugUtils;
const b = MapSpriteTranslation;
const I = BuildingAnimArtProps;
const i = typeGuard;
const k = HighlightAnimRunner;
const S = TechnoRules;
const w = AttackTrait;
const a = SideType;
const C = FactoryTrait;
const E = UnitRepairTrait;
const n = DeathType;
const B = InvulnerableAnimRunner;
const N = BuildingShpHelper;
const x = ExtraLightHelper;
const o = AlphaRenderable;
const O = DebugRenderable;
const M = MathUtils;
const j = new Map()
    .set(A.AnimationType.PRODUCTION, A.AnimationType.IDLE)
    .set(A.AnimationType.BUILDUP, A.AnimationType.IDLE)
    .set(A.AnimationType.SPECIAL_DOCKING, A.AnimationType.IDLE)
    .set(A.AnimationType.SPECIAL_REPAIR_START, A.AnimationType.SPECIAL_REPAIR_LOOP)
    .set(A.AnimationType.SPECIAL_REPAIR_LOOP, A.AnimationType.SPECIAL_REPAIR_END)
    .set(A.AnimationType.SPECIAL_REPAIR_END, A.AnimationType.IDLE)
    .set(A.AnimationType.SUPER_CHARGE_START, A.AnimationType.SUPER_CHARGE_LOOP)
    .set(A.AnimationType.SUPER_CHARGE_LOOP, A.AnimationType.SUPER_CHARGE_END)
    .set(A.AnimationType.SUPER_CHARGE_END, A.AnimationType.IDLE)
    .set(A.AnimationType.FACTORY_DEPLOYING, A.AnimationType.IDLE)
    .set(A.AnimationType.FACTORY_ROOF_DEPLOYING, A.AnimationType.IDLE);
const l = new Map()
    .set(A.AnimationType.SUPER_CHARGE_START, [
    A.AnimationType.SUPER,
    1,
])
    .set(A.AnimationType.SUPER_CHARGE_LOOP, [
    A.AnimationType.SUPER,
    2,
])
    .set(A.AnimationType.SUPER_CHARGE_END, [A.AnimationType.SUPER, 3])
    .set(A.AnimationType.SPECIAL_REPAIR_START, [
    A.AnimationType.SPECIAL,
    0,
])
    .set(A.AnimationType.SPECIAL_REPAIR_LOOP, [
    A.AnimationType.SPECIAL,
    1,
])
    .set(A.AnimationType.SPECIAL_REPAIR_END, [
    A.AnimationType.SPECIAL,
    2,
])
    .set(A.AnimationType.SPECIAL_DOCKING, [
    A.AnimationType.SPECIAL,
    0,
])
    .set(A.AnimationType.SPECIAL_SHOOT, [A.AnimationType.SPECIAL, 0])
    .set(A.AnimationType.FACTORY_DEPLOYING, [
    A.AnimationType.FACTORY_DEPLOYING,
    0,
])
    .set(A.AnimationType.FACTORY_UNDER_DOOR, [
    A.AnimationType.FACTORY_DEPLOYING,
    1,
])
    .set(A.AnimationType.FACTORY_ROOF_DEPLOYING, [
    A.AnimationType.FACTORY_ROOF_DEPLOYING,
    0,
])
    .set(A.AnimationType.FACTORY_UNDER_ROOF_DOOR, [
    A.AnimationType.FACTORY_ROOF_DEPLOYING,
    1,
]);
export class Building {
    static lampTextures = new Map();
    gameObject: any;
    selectionModel: any;
    rules: any;
    art: any;
    imageFinder: any;
    voxels: any;
    voxelAnims: any;
    palette: any;
    animPalette: any;
    isoPalette: any;
    camera: any;
    lighting: any;
    debugFrame: any;
    gameSpeed: any;
    vxlBuilderFactory: any;
    useSpriteBatching: any;
    buildingImageDataCache: any;
    pipOverlay: any;
    worldSound: any;
    initialAnimType: any;
    animObjects: Map<any, any>;
    animations: Map<any, any>;
    animSounds: Map<any, any>;
    powered: boolean;
    repairStopRequested: boolean;
    repairStartRequested: boolean;
    highlightAnimRunner: any;
    invulnAnimRunner: any;
    plugins: any[];
    objectArt: any;
    objectRules: any;
    type: any;
    paletteRemaps: any;
    lastOwnerColor: any;
    vxlExtraLight: any;
    shpExtraLight: any;
    baseVxlExtraLight: any;
    baseShpExtraLight: any;
    animArtProps: any;
    mainShpFile: any;
    bibShpFile: any;
    animShpFiles: any;
    shpFrameInfos: any;
    aggregatedImageData: any;
    withPosition: any;
    target: any;
    intersectTarget: any;
    placeholderObj: any;
    mainObj: any;
    bib: any;
    fireObjects: any;
    turretBuilders: any;
    turret: any;
    turretRot: any;
    rubbleObj: any;
    rangeCircle: any;
    rangeCircleWrapper: any;
    spriteOffset: any;
    spriteWrap: any;
    muzzleAnims: any;
    currentAnimType: any;
    lastHasC4Charge: any;
    lastInvulnerable: any;
    lastWarpedOut: any;
    lastAttackState: any;
    lastFactoryStatus: any;
    lastRepairStatus: any;
    lastSuperWeaponAlmostCharged: any;
    lastTurretFacing: any;
    lastTurretRotating: any;
    lastPowered: any;
    lastOccupiedState: any;
    lastHealth: any;
    lastWallType: any;
    lastOverpowered: any;
    renderableManager: any;
    ambientSound: any;
    turretRotateSound: any;
    poweredSound: any;
    constructor(e: any, t: any, i: any, r: any, s: any, a: any, n: any, o: any, l: any, c: any, h: any, u: any, d: any, g: any, p: any, m: any, f: any, y: any, T: any, v: any, b: any, S = A.AnimationType.IDLE) {
        this.gameObject = e;
        this.selectionModel = t;
        this.rules = i;
        this.art = r;
        this.imageFinder = s;
        this.voxels = n;
        this.voxelAnims = o;
        this.palette = l;
        this.animPalette = c;
        this.isoPalette = h;
        this.camera = u;
        this.lighting = d;
        this.debugFrame = g;
        this.gameSpeed = p;
        this.vxlBuilderFactory = m;
        this.useSpriteBatching = f;
        this.buildingImageDataCache = T;
        this.pipOverlay = v;
        this.worldSound = b;
        this.initialAnimType = S;
        this.animObjects = new Map();
        this.animations = new Map();
        this.animSounds = new Map();
        this.powered = true;
        this.repairStopRequested = false;
        this.repairStartRequested = false;
        this.highlightAnimRunner = new k.HighlightAnimRunner(this.gameSpeed);
        this.invulnAnimRunner = new B.InvulnerableAnimRunner(this.gameSpeed);
        this.plugins = [];
        this.objectArt = e.art;
        this.objectRules = e.rules;
        this.type = this.objectRules.name;
        this.paletteRemaps = [...this.rules.colors.values()].map((e) => this.palette.clone().remap(e));
        this.palette.remap(this.gameObject.owner.color);
        this.lastOwnerColor = this.gameObject.owner.color;
        this.updateBaseLight();
        this.vxlExtraLight = new THREE.Vector3().copy(this.baseVxlExtraLight);
        this.shpExtraLight = new THREE.Vector3().copy(this.baseShpExtraLight);
        const animArtProps = (this.animArtProps = new I.BuildingAnimArtProps());
        this.animArtProps.read(this.objectArt.art, this.art);
        let mainShpFile;
        try {
            mainShpFile = this.imageFinder.findByObjectArt(this.objectArt);
        }
        catch (e) {
            if (!(e instanceof MissingImageError))
                throw e;
            console.warn(e.message);
        }
        this.mainShpFile = mainShpFile;
        let bibShpFile;
        try {
            bibShpFile = this.objectArt.bibShape
                ? this.imageFinder.find(this.objectArt.bibShape, this.objectArt.useTheaterExtension)
                : void 0;
        }
        catch (e) {
            if (!(e instanceof MissingImageError))
                throw e;
            console.warn(e.message);
        }
        this.bibShpFile = bibShpFile;
        const buildingShpHelper = new N.BuildingShpHelper(this.imageFinder);
        const animShpFiles = buildingShpHelper.collectAnimShpFiles(animArtProps, this.objectArt);
        this.animShpFiles = animShpFiles;
        const shpFrameInfos = (this.shpFrameInfos = buildingShpHelper.getShpFrameInfos(this.objectArt, mainShpFile, bibShpFile, animShpFiles));
        let aggregatedImageData = this.buildingImageDataCache.get(this.gameObject.name);
        aggregatedImageData ||
            ((aggregatedImageData = y.aggregate(shpFrameInfos.values(), `agg_${this.objectRules.name}.shp`)),
                this.buildingImageDataCache.set(this.gameObject.name, aggregatedImageData)),
            (this.aggregatedImageData = aggregatedImageData),
            (this.withPosition = new R.WithPosition());
    }
    updateBaseLight() {
        (this.baseShpExtraLight = this.lighting
            .compute(this.objectArt.lightingType, this.gameObject.tile)
            .addScalar(-1)),
            (this.baseVxlExtraLight = new THREE.Vector3().setScalar(1 + this.lighting.computeNoAmbient(this.objectArt.lightingType, this.gameObject.tile)));
    }
    updateLighting() {
        this.updateBaseLight(),
            this.vxlExtraLight.copy(this.baseVxlExtraLight),
            this.shpExtraLight.copy(this.baseShpExtraLight),
            this.plugins.forEach((e) => e.updateLighting?.());
    }
    get3DObject() {
        return this.target;
    }
    getIntersectTarget() {
        return this.intersectTarget;
    }
    updateIntersectTarget() {
        this.intersectTarget = [
            this.placeholderObj?.get3DObject(),
            this.mainObj?.getShapeMesh(),
            this.bib?.getShapeMesh(),
            ...[...this.animObjects.values()]
                .flat()
                .map((e) => e.getShapeMesh()),
        ].filter(i.isNotNullOrUndefined);
    }
    getUiName() {
        var e = this.plugins.reduce((e, t) => t.getUiNameOverride?.() ?? e, void 0);
        return void 0 !== e ? e : this.gameObject.getUiName();
    }
    create3DObject() {
        let t = this.get3DObject();
        if (!t) {
            (t = new THREE.Object3D()),
                (t.name = "building_" + this.type),
                (t.userData.id = this.gameObject.id),
                (this.target = t),
                (t.matrixAutoUpdate = false),
                (this.withPosition.matrixUpdate = true),
                this.withPosition.applyTo(this);
            var e = this.gameObject.rules.alphaImage;
            if (e) {
                var i = this.imageFinder.tryFind(e, false);
                if (i) {
                    let e = new o.AlphaRenderable(i, this.camera, new THREE.Vector2(0, (g.Coords.ISO_TILE_SIZE + 1) / 2));
                    e.create3DObject(), t.add(e.get3DObject());
                }
                else
                    console.warn(`<${this.objectRules.name}>: Alpha image "${e}" not found`);
            }
            (this.objectRules.lightIntensity &&
                (this.createLamp(t), this.objectRules.isLightpost)) ||
                (this.createObjects(t),
                    this.updateIntersectTarget(),
                    this.pipOverlay &&
                        (this.pipOverlay.create3DObject(),
                            t.add(this.pipOverlay.get3DObject())),
                    this.updateImage(this.computeDamageType(this.gameObject.healthTrait.health)),
                    this.mainObj?.setExtraLight(this.shpExtraLight),
                    [...this.animObjects.values()].forEach((e) => {
                        e.forEach((e) => {
                            let t = this.animations.get(e);
                            t.props.getArt().has("UseNormalLight") ||
                                e.setExtraLight(this.shpExtraLight);
                        });
                    }),
                    this.bib?.setExtraLight(this.shpExtraLight),
                    this.turretBuilders?.forEach((e) => {
                        e instanceof d.ShpBuilder
                            ? e.setExtraLight(this.shpExtraLight)
                            : e.setExtraLight(this.vxlExtraLight);
                    }));
        }
    }
    createLamp(e) {
        const objectRules = this.objectRules;
        let redTint = (1 + objectRules.lightRedTint) * (1 + Math.abs(objectRules.lightIntensity)) - 1;
        let greenTint = (1 + objectRules.lightGreenTint) * (1 + Math.abs(objectRules.lightIntensity)) - 1;
        let blueTint = (1 + objectRules.lightBlueTint) * (1 + Math.abs(objectRules.lightIntensity)) - 1;
        const maxTint = Math.max(redTint, greenTint, blueTint);
        if (maxTint > 1) {
            redTint /= maxTint;
            greenTint /= maxTint;
            blueTint /= maxTint;
        }
        const color = new THREE.Color(redTint, greenTint, blueTint).multiplyScalar(0.9);
        const colorKey = color.getHexString();
        let texture = Building.lampTextures.get(colorKey);
        if (!texture) {
            texture = this.createLampTexture(colorKey);
            Building.lampTextures.set(colorKey, texture);
        }
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            depthTest: false,
            depthWrite: false,
            transparent: true,
            blending: THREE.CustomBlending,
            blendEquation: 0 < objectRules.lightIntensity
                ? THREE.AddEquation
                : THREE.ReverseSubtractEquation,
            blendSrc: THREE.DstColorFactor,
            blendDst: THREE.OneFactor,
        });
        const visibility = objectRules.lightVisibility;
        const geometry = new THREE.PlaneGeometry(2 * visibility, 2 * visibility);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.renderOrder = 999995;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        e.add(mesh);
    }
    createLampTexture(e) {
        let t = document.createElement("canvas");
        t.width = t.height = 32;
        let i = t.getContext("2d");
        (i.fillStyle = "black"), i.fillRect(0, 0, 32, 32);
        let r = i.createRadialGradient(16, 16, 0, 16, 16, 16);
        r.addColorStop(0, "#" + e),
            r.addColorStop(1, "black"),
            i.arc(16, 16, 16, 0, 2 * Math.PI),
            (i.fillStyle = r),
            i.fill();
        let s = new THREE.Texture(t);
        return (s.needsUpdate = true), s;
    }
    setPosition(e) {
        var t = this.gameObject.getFoundationCenterOffset();
        this.withPosition.setPosition(e.x - t.x, e.y, e.z - t.y);
    }
    getPosition() {
        return this.withPosition.getPosition();
    }
    registerPlugin(e) {
        this.plugins.push(e);
    }
    highlight() {
        this.plugins.some((e) => e.shouldDisableHighlight?.()) ||
            this.highlightAnimRunner.animate(2);
    }
    update(i) {
        if (!this.objectRules.isLightpost) {
            this.gameObject.isDestroyed ||
                void 0 !== this.currentAnimType ||
                this.setAnimation(this.initialAnimType, i),
                this.plugins.forEach((e) => e.update(i)),
                this.pipOverlay?.update(i);
            var t = this.gameObject.c4ChargeTrait?.hasCharge();
            !this.gameObject.isDestroyed &&
                this.lastHasC4Charge !== t &&
                t &&
                ((this.lastHasC4Charge = t), this.highlight());
            const shouldUpdateHighlight = this.highlightAnimRunner.shouldUpdate();
            const isInvulnerable = this.gameObject.invulnerableTrait.isActive();
            const invulnerableChanged = isInvulnerable !== this.lastInvulnerable;
            (this.lastInvulnerable = isInvulnerable) &&
                invulnerableChanged &&
                this.invulnAnimRunner.animate(),
                this.invulnAnimRunner.shouldUpdate() &&
                    this.invulnAnimRunner.tick(i),
                (shouldUpdateHighlight || invulnerableChanged || isInvulnerable) &&
                    (shouldUpdateHighlight && this.highlightAnimRunner.tick(i),
                        (() => {
                            const invulnerableValue = isInvulnerable ? this.invulnAnimRunner.getValue() : 0;
                            const highlightValue = (shouldUpdateHighlight ? this.highlightAnimRunner.getValue() : 0) || invulnerableValue;
                            const ambientIntensity = this.lighting.getAmbientIntensity();
                            x.ExtraLightHelper.multiplyVxl(this.vxlExtraLight, this.baseVxlExtraLight, ambientIntensity, highlightValue);
                            x.ExtraLightHelper.multiplyShp(this.shpExtraLight, this.baseShpExtraLight, highlightValue);
                        })());
            let opacityTarget;
            const warpedOut = this.gameObject.warpedOutTrait.isActive();
            if (warpedOut !== this.lastWarpedOut) {
                opacityTarget = (this.lastWarpedOut = warpedOut) ? 0.5 : 1;
                for (const renderable of [
                    this.mainObj,
                    this.bib,
                    ...[...this.animObjects.values()].flat(),
                ])
                    renderable?.setOpacity(opacityTarget);
                this.turretBuilders?.forEach((e) => e.setOpacity(opacityTarget)),
                    this.placeholderObj?.setOpacity(opacityTarget);
            }
            this.gameObject.isDestroyed ||
                ((o = this.gameObject.owner.color),
                    this.lastOwnerColor !== o &&
                        (this.palette.remap(o),
                            this.mainObj?.setPalette(this.palette),
                            [...this.animObjects.values()].forEach((e) => {
                                e.forEach((e) => e.setPalette(this.palette));
                            }),
                            this.bib?.setPalette(this.palette),
                            this.turretBuilders?.forEach((e) => e.setPalette(this.palette)),
                            this.placeholderObj?.setPalette(this.palette),
                            (this.lastOwnerColor = o))),
                !this.gameObject.isDestroyed &&
                    j.has(this.currentAnimType) &&
                    ((l = j.get(this.currentAnimType)),
                        this.hasObjectWithStoppedAnimation(this.currentAnimType) && this.setAnimation(l, i)),
                this.gameObject.isDestroyed ||
                    this.gameObject.buildStatus !==
                        m.BuildStatus.BuildDown ||
                    this.currentAnimType === A.AnimationType.UNBUILD ||
                    this.setAnimation(A.AnimationType.UNBUILD, i);
            var o = this.gameObject.attackTrait?.attackState;
            if ((void 0 === this.lastAttackState ||
                (this.lastAttackState !== o &&
                    !this.gameObject.isDestroyed)) &&
                ((this.lastAttackState = o),
                    !this.gameObject.isDestroyed &&
                        this.hasAnimation(A.AnimationType.SPECIAL_SHOOT) &&
                        (o === w.AttackState.FireUp
                            ? this.setAnimation(A.AnimationType.SPECIAL_SHOOT, i)
                            : this.currentAnimType ===
                                A.AnimationType.SPECIAL_SHOOT &&
                                this.setAnimation(A.AnimationType.IDLE, i)),
                    o === w.AttackState.JustFired &&
                        this.objectArt.muzzleFlash)) {
                let e = this.createMuzzleFlashAnim(this.spriteOffset, this.renderableManager);
                e &&
                    (e.create3DObject(),
                        this.spriteWrap.add(e.get3DObject()),
                        (this.muzzleAnims = this.muzzleAnims || []),
                        this.muzzleAnims.push(e));
            }
            var l = this.gameObject.factoryTrait;
            if (l) {
                var c = l.status;
                if (this.lastFactoryStatus !== c &&
                    !this.gameObject.isDestroyed) {
                    o = this.lastFactoryStatus;
                    if (((this.lastFactoryStatus = c), void 0 !== o)) {
                        let e, t = false;
                        [
                            S.FactoryType.BuildingType,
                            S.FactoryType.NavalUnitType,
                        ].includes(l.type)
                            ? (e = A.AnimationType.PRODUCTION)
                            : l.type === S.FactoryType.UnitType
                                ? ((e = l.deliveringUnit?.rules.consideredAircraft
                                    ? A.AnimationType.FACTORY_ROOF_DEPLOYING
                                    : A.AnimationType.FACTORY_DEPLOYING),
                                    (t = true))
                                : (e = void 0),
                            e &&
                                this.hasAnimation(e) &&
                                (c === C.FactoryStatus.Delivering
                                    ? this.setAnimation(e, i)
                                    : t &&
                                        this.setAnimation(A.AnimationType.IDLE, i));
                    }
                }
            }
            const repairStatus = this.gameObject.unitRepairTrait?.status;
            if (this.lastRepairStatus !== repairStatus &&
                !this.gameObject.isDestroyed) {
                const previousRepairStatus = this.lastRepairStatus;
                this.lastRepairStatus = repairStatus;
                if (this.hasAnimation(A.AnimationType.SPECIAL_REPAIR_START)) {
                    if (repairStatus === E.RepairStatus.Repairing) {
                        if ((this.currentAnimType !== A.AnimationType.SPECIAL_REPAIR_LOOP &&
                            this.currentAnimType !== A.AnimationType.SPECIAL_REPAIR_END) ||
                            previousRepairStatus !== E.RepairStatus.Idle) {
                            this.setAnimation(A.AnimationType.SPECIAL_REPAIR_START, i);
                        }
                        else {
                            this.repairStartRequested = true;
                        }
                        this.repairStopRequested = false;
                    }
                    else {
                        if (this.currentAnimType === A.AnimationType.SPECIAL_REPAIR_START) {
                            this.repairStopRequested = true;
                        }
                        else {
                            this.endCurrentAnimation();
                        }
                        this.repairStartRequested = false;
                    }
                }
            }
            const superWeapon = this.gameObject.superWeaponTrait?.getSuperWeapon(this.gameObject);
            if (superWeapon &&
                this.hasAnimation(A.AnimationType.SUPER_CHARGE_START) &&
                !this.gameObject.isDestroyed) {
                const superWeaponAlmostCharged = superWeapon.getTimerSeconds() <=
                    60 * this.objectRules.chargedAnimTime;
                if (superWeaponAlmostCharged !== this.lastSuperWeaponAlmostCharged) {
                    this.lastSuperWeaponAlmostCharged = superWeaponAlmostCharged;
                    if (superWeaponAlmostCharged) {
                        this.setAnimation(A.AnimationType.SUPER_CHARGE_START, i);
                    }
                    else {
                        this.endCurrentAnimation();
                    }
                }
            }
            if (this.repairStopRequested &&
                this.currentAnimType === A.AnimationType.SPECIAL_REPAIR_LOOP) {
                this.endCurrentAnimation();
                this.repairStopRequested = false;
            }
            if (this.repairStartRequested &&
                this.currentAnimType === A.AnimationType.IDLE) {
                this.setAnimation(A.AnimationType.SPECIAL_REPAIR_START, i);
                this.repairStartRequested = false;
            }
            this.muzzleAnims && this.updateMuzzleAnims(i);
            const animationPaused = false;
            if (!animationPaused) {
                this.animations.forEach((animation, renderable) => {
                    switch (animation.getState()) {
                        case f.AnimationState.STOPPED:
                            return;
                        case f.AnimationState.DELAYED:
                            animation.update(i);
                            renderable.get3DObject().visible =
                                animation.getState() !== f.AnimationState.DELAYED;
                            break;
                        case f.AnimationState.NOT_STARTED:
                            animation.start(i);
                            animation.update(i);
                            break;
                        case f.AnimationState.RUNNING:
                        default:
                            animation.update(i);
                            break;
                    }
                    renderable.setFrame(animation.getCurrentFrame());
                });
                this.animObjects.forEach((renderables, animType) => {
                    const animProps = this.animArtProps.getByType(animType);
                    renderables.forEach((renderable, index) => {
                        const animData = animProps[index];
                        const animation = this.animations.get(renderable);
                        const translucent = animData.translucent;
                        const translucency = animData.translucency;
                        if (translucent || 0 < translucency) {
                            const opacity = translucent
                                ? 1 -
                                    animation.getCurrentFrame() /
                                        (animation.props.end - animation.props.start)
                                : 1 - translucency;
                            renderable.setOpacity(opacity);
                        }
                    });
                });
            }
            this.toggleRangeCircleVisibility((this.gameObject.showWeaponRange ||
                (this.selectionModel.isSelected() &&
                    -1 !== this.gameObject.rules.techLevel)) &&
                !animationPaused);
            const wallTypeChanged = this.gameObject.wallTrait?.wallType !==
                this.lastWallType;
            const occupiedChanged = void 0 === this.lastOccupiedState ||
                this.lastOccupiedState !==
                    !!this.gameObject.garrisonTrait?.isOccupied();
            const healthChanged = void 0 === this.lastHealth ||
                this.lastHealth !== this.gameObject.healthTrait.health;
            if (wallTypeChanged || occupiedChanged || healthChanged) {
                const damageType = this.computeDamageType(this.gameObject.healthTrait.health);
                const damageTypeChanged = healthChanged &&
                    damageType !== this.computeDamageType(this.lastHealth);
                this.lastOccupiedState =
                    !!this.gameObject.garrisonTrait?.isOccupied();
                this.lastHealth = this.gameObject.healthTrait.health;
                this.lastWallType = this.gameObject.wallTrait?.wallType;
                if (wallTypeChanged || occupiedChanged || damageTypeChanged) {
                    this.updateImage(damageType);
                }
                if (damageTypeChanged &&
                    damageType === p.DamageType.DESTROYED &&
                    this.objectRules.explosion?.length) {
                    this.createExplosionAnims(this.renderableManager);
                }
            }
            if (this.gameObject.turretTrait) {
                const turretFacing = this.gameObject.turretTrait.facing;
                if (turretFacing !== this.lastTurretFacing) {
                    this.lastTurretFacing = turretFacing;
                    this.turretRot.rotation.y = THREE.MathUtils.degToRad(turretFacing);
                    this.turretRot.updateMatrix();
                }
                const turretRotating = this.gameObject.turretTrait.isRotating() &&
                    !animationPaused;
                if (this.lastTurretRotating !== turretRotating) {
                    this.lastTurretRotating = turretRotating;
                    const turretRotateSound = this.objectRules.turretRotateSound;
                    if (turretRotateSound) {
                        if (turretRotating && !this.gameObject.isDestroyed) {
                            this.turretRotateSound =
                                this.worldSound?.playEffect(turretRotateSound, this.gameObject, this.gameObject.owner);
                        }
                        else {
                            this.turretRotateSound?.stop();
                        }
                    }
                }
            }
            if (this.gameObject.poweredTrait) {
                if (this.gameObject.isDestroyed) {
                    if (this.poweredSound) {
                        this.poweredSound.stop();
                        this.poweredSound = void 0;
                    }
                }
                else {
                    const isPowered = this.gameObject.poweredTrait.isPoweredOn() &&
                        !animationPaused;
                    if (isPowered !== this.lastPowered) {
                        this.setPowered(isPowered);
                        this.lastPowered = isPowered;
                        this.poweredSound?.stop();
                        const poweredSound = isPowered
                            ? this.gameObject.rules.workingSound
                            : this.gameObject.rules.notWorkingSound;
                        if (poweredSound && !animationPaused) {
                            this.poweredSound =
                                this.worldSound?.playEffect(poweredSound, this.gameObject, this.gameObject.owner, 0.25);
                        }
                    }
                }
            }
        }
    }
    createExplosionAnims(e) {
        var i = this.objectArt.foundation, r = this.objectRules.explosion;
        for (let a = 0; a < i.width; a++)
            for (let t = 0; t < i.height; t++) {
                var s = r[u.getRandomInt(0, r.length - 1)];
                e.createTransientAnim(s, (e) => {
                    e.setPosition(g.Coords.tile3dToWorld(a, t, 0).add(this.withPosition.getPosition()));
                });
            }
    }
    updateMuzzleAnims(t) {
        let i = this.muzzleAnims, r = [];
        i.forEach((e) => {
            e.update(t),
                e.isAnimFinished() &&
                    (this.spriteWrap.remove(e.get3DObject()),
                        e.dispose(),
                        r.push(e));
        }),
            r.forEach((e) => i.splice(i.indexOf(e), 1));
    }
    getNormalizedAnimType(e) {
        let t = 0, i = e;
        return l.has(e) && ([i, t] = l.get(e)), [i, t];
    }
    hasObjectWithStoppedAnimation(t) {
        var [i, r] = this.getNormalizedAnimType(t), list = this.animObjects.get(i);
        if (list && list.length > 0) {
            const clampedIndex = Math.min(r, list.length - 1);
            const animObj = list[clampedIndex];
            const anim = this.animations.get(animObj);
            if (anim && anim.getState() === f.AnimationState.STOPPED)
                return true;
        }
        return false;
    }
    computeDamageType(e) {
        if (!e)
            return p.DamageType.DESTROYED;
        let t;
        return ((t =
            e > 100 * this.rules.audioVisual.conditionYellow
                ? p.DamageType.NORMAL
                : e > 100 * this.rules.audioVisual.conditionRed
                    ? p.DamageType.CONDITION_YELLOW
                    : p.DamageType.CONDITION_RED),
            ((t && this.objectRules.canBeOccupied) ||
                t === p.DamageType.CONDITION_RED) &&
                (t -= 1),
            t);
    }
    updateImage(o) {
        let l = o === p.DamageType.DESTROYED;
        l
            ? (this.objectRules.leaveRubble &&
                this.rubbleObj &&
                (this.rubbleObj.get3DObject().visible = true),
                this.mainObj && (this.mainObj.get3DObject().visible = false))
            : this.gameObject.wallTrait
                ? this.updateWallImage(this.gameObject.wallTrait.wallType, o)
                : this.updateMainObjFrame(!!this.gameObject.garrisonTrait?.isOccupied(), o),
            this.bib &&
                (l && (this.bib.get3DObject().visible = false),
                    this.bib.setFrame(o !== p.DamageType.NORMAL ? 1 : 0)),
            this.turret && l && (this.turret.visible = false),
            this.animObjects.forEach((a, n) => {
                a.forEach((t, i) => {
                    if (n !== A.AnimationType.BUILDUP &&
                        n !== A.AnimationType.UNBUILD) {
                        l && a.forEach((e) => (e.get3DObject().visible = false));
                        let e = this.animations.get(t);
                        var r = o !== p.DamageType.NORMAL, s = this.animArtProps.getByType(n)[i];
                        !r || s.damagedArt
                            ? (e.props.setArt(r ? s.damagedArt : s.art),
                                e.rewind())
                            : console.warn(`<${this.gameObject.name}>: Missing damaged anim ${A.AnimationType[n]},` +
                                i);
                    }
                });
            });
        let r = o !== p.DamageType.NORMAL && !l;
        this.fireObjects.forEach((e) => {
            e.get3DObject().visible = r;
            let t = this.animations.get(e);
            t.rewind();
            var i = t.props.getArt().getString("StartSound");
            i && this.handleSoundChange(i, e, r, 0.15);
        });
    }
    updateMainObjFrame(e, t) {
        let i = e ? 2 : t;
        var r;
        this.mainShpFile &&
            this.mainObj &&
            ((r = this.shpFrameInfos.get(this.mainShpFile).frameCount),
                i >= r &&
                    (console.warn(`Building ${this.objectRules.name} has damage frame ` +
                        i +
                        ` (occupied=${e}, damageType=${p.DamageType[t]}) out of bounds`),
                        (i = p.DamageType.NORMAL)),
                this.mainObj.setFrame(i));
    }
    updateWallImage(e, t) {
        var i;
        this.mainObj &&
            this.mainShpFile &&
            ((i =
                this.shpFrameInfos.get(this.mainShpFile).frameCount <
                    r.wallTypes.length
                    ? 1
                    : r.wallTypes.length),
                this.mainObj.setFrame(e + t * i));
    }
    createObjects(t) {
        const foundation = this.objectArt.foundation;
        this.debugFrame.value &&
            t.add(v.DebugUtils.createWireframe(foundation, this.objectArt.height));
        let spriteTranslation = new b.MapSpriteTranslation(foundation.width, foundation.height);
        const { spriteOffset, anchorPointWorld } = spriteTranslation.compute();
        const anchorOffset = (this.spriteOffset = this.computeSpriteAnchorOffset(spriteOffset));
        let spriteWrap = (this.spriteWrap = new THREE.Object3D());
        spriteWrap.matrixAutoUpdate = false;
        let contentWrap = spriteWrap;
        let adjustedOffset = { ...anchorOffset };
        let hasZShapeFix = false;
        const zShapePointMove = this.objectArt.zShapePointMove;
        if ((this.gameObject.rules.refinery ||
            this.gameObject.rules.nukeSilo) &&
            zShapePointMove.length) {
            contentWrap = new THREE.Object3D();
            contentWrap.matrixAutoUpdate = false;
            spriteWrap.add(contentWrap);
            hasZShapeFix = true;
            const zShapeMove = {
                x: -zShapePointMove[0] / g.Coords.ISO_TILE_SIZE,
                y: -zShapePointMove[1] / g.Coords.ISO_TILE_SIZE,
            };
            const zShapeTranslation = new b.MapSpriteTranslation(zShapeMove.x, zShapeMove.y);
            const { spriteOffset: zShapeOffset, anchorPointWorld: zShapeAnchor } = zShapeTranslation.compute();
            contentWrap.position.x = zShapeAnchor.x;
            contentWrap.position.z = zShapeAnchor.y;
            contentWrap.updateMatrix();
            adjustedOffset.x += zShapeOffset.x;
            adjustedOffset.y += zShapeOffset.y;
        }
        this.mainShpFile
            ? ((this.mainObj = this.createMainObject(this.mainShpFile, adjustedOffset, hasZShapeFix)),
                this.mainObj.create3DObject(),
                contentWrap.add(this.mainObj.get3DObject()),
                this.mainObj.getFlat() &&
                    (M.MathUtils.translateTowardsCamera(this.mainObj.get3DObject(), this.camera, +g.Coords.ISO_WORLD_SCALE),
                        this.mainObj.get3DObject().updateMatrix()))
            : ((this.placeholderObj = new O.DebugRenderable(foundation, this.objectArt.height, this.palette)),
                this.placeholderObj.setBatched(this.useSpriteBatching),
                this.useSpriteBatching &&
                    this.placeholderObj.setBatchPalettes(this.paletteRemaps),
                this.placeholderObj.create3DObject(),
                t.add(this.placeholderObj.get3DObject())),
            this.objectRules.leaveRubble &&
                ((this.rubbleObj = this.createRubbleObject(anchorOffset)),
                    this.rubbleObj &&
                        (this.rubbleObj.setExtraLight(this.shpExtraLight),
                            this.rubbleObj.create3DObject(),
                            (this.rubbleObj.get3DObject().visible = false),
                            spriteWrap.add(this.rubbleObj.get3DObject())));
        let animationObjects = this.createAnimObjects(adjustedOffset, hasZShapeFix);
        if ((animationObjects.forEach((e) => {
            contentWrap.add(e);
        }),
            (this.fireObjects = this.createFireObjects(anchorOffset)),
            this.fireObjects.forEach((e) => {
                spriteWrap.add(e.get3DObject());
            }),
            this.objectRules.turret &&
                (() => {
                    const { turret, turretRot } = this.createTurretObject(anchorOffset, anchorPointWorld);
                    this.turret = turret;
                    this.turretRot = turretRot;
                    spriteWrap.add(this.turret);
                })(),
            this.bibShpFile)) {
            (this.bib = this.createBibObject(this.bibShpFile, anchorOffset)),
                this.bib.create3DObject();
            let bibObject = this.bib.get3DObject();
            M.MathUtils.translateTowardsCamera(bibObject, this.camera, -1),
                bibObject.updateMatrix(),
                spriteWrap.add(this.bib.get3DObject());
        }
        if (this.gameObject.primaryWeapon ||
            this.gameObject.rules.hasRadialIndicator) {
            const range =
                this.gameObject.psychicDetectorTrait?.radiusTiles ??
                    this.gameObject.gapGeneratorTrait?.radiusTiles ??
                    this.gameObject.primaryWeapon?.range;
            if (range) {
                const rangeCircle = this.rangeCircle = this.createRangeCircle(range);
                let rangeCircleWrapper = (this.rangeCircleWrapper = new THREE.Object3D());
                (rangeCircleWrapper.matrixAutoUpdate = false),
                    (rangeCircleWrapper.position.x = anchorPointWorld.x / 2),
                    (rangeCircleWrapper.position.z = anchorPointWorld.y / 2),
                    rangeCircleWrapper.updateMatrix(),
                    (rangeCircleWrapper.visible = false),
                    rangeCircleWrapper.add(rangeCircle),
                    t.add(rangeCircleWrapper);
            }
        }
        (spriteWrap.position.x = anchorPointWorld.x),
            (spriteWrap.position.z = anchorPointWorld.y),
            spriteWrap.updateMatrix(),
            t.add(spriteWrap);
    }
    computeSpriteAnchorOffset(e) {
        var t = this.objectArt.getDrawOffset();
        return { x: e.x + t.x, y: e.y + t.y };
    }
    createMainObject(e, t, i = false) {
        let r = false;
        this.objectRules.turret &&
            "CAOUTP" !== this.objectRules.name &&
            (r = true);
        let s = T.ShpRenderable.factory(this.aggregatedImageData.file, this.palette, this.camera, t, this.objectArt.hasShadow, 0, !r, 0, i);
        return (s.setSize(e),
            s.setFrameOffset(this.aggregatedImageData.imageIndexes.get(e)),
            s.setBatched(this.useSpriteBatching),
            this.useSpriteBatching &&
                s.setBatchPalettes(this.paletteRemaps),
            s.setFlat(r),
            s);
    }
    createRubbleObject(t) {
        var i = this.mainShpFile;
        if (i) {
            let e = T.ShpRenderable.factory(this.aggregatedImageData.file, this.isoPalette, this.camera, t, this.objectArt.hasShadow);
            if ((e.setSize(i),
                !(this.shpFrameInfos.get(i).frameCount < 4)))
                return (e.setFrameOffset(this.aggregatedImageData.imageIndexes.get(i)),
                    e.setBatched(this.useSpriteBatching),
                    this.useSpriteBatching &&
                        e.setBatchPalettes([this.isoPalette]),
                    e.setFlat(true),
                    e.setFrame(3),
                    e);
            console.warn(`Building image ${this.objectArt.imageName} has no rubble frame (missing 4th frame)`);
        }
    }
    createAnimObjects(n, o) {
        let l = [];
        return (this.animArtProps.getAll().forEach((e, t) => {
            let i = [], r = 1;
            for (var s of e) {
                var a = this.animShpFiles.get(s);
                if (a) {
                    let e = this.createAnimObject(s, a, n, r++, o);
                    e && (l.push(e.get3DObject()), i.push(e));
                }
            }
            this.animObjects.set(t, i);
        }),
            l);
    }
    createFireObjects(n) {
        let o = [], l = 0;
        for (;;) {
            let e = this.objectArt.art.getString("DamageFireOffset" + l++);
            if (!e)
                break;
            var c = this.rules.audioVisual.fireNames, h = c[u.getRandomInt(0, c.length - 1)];
            let t;
            try {
                t = this.imageFinder.find(h, this.objectArt.useTheaterExtension);
            }
            catch (e) {
                if (e instanceof MissingImageError) {
                    console.warn(e.message);
                    continue;
                }
                throw e;
            }
            c = e.split(/\.|,/).filter((e) => "" !== e);
            let i = parseInt(c[0], 10), r = parseInt(c[1], 10);
            c = this.animPalette;
            let s = new d.ShpBuilder(t, c, this.camera, g.Coords.ISO_WORLD_SCALE, true, 3);
            s.setOffset({ x: n.x + i, y: n.y + r });
            let a = new T.ShpRenderable(s);
            a.setBatched(this.useSpriteBatching),
                this.useSpriteBatching && a.setBatchPalettes([c]),
                a.create3DObject(),
                (a.get3DObject().visible = false);
            (h = this.art.getAnimation(h)),
                (h = new y.AnimProps(h.art, t));
            this.animations.set(a, new f.Animation(h, this.gameSpeed)),
                o.push(a);
        }
        return o;
    }
    createMuzzleFlashAnim(e, i) {
        if (this.objectArt.muzzleFlash?.length) {
            const muzzleIndex = u.getRandomInt(0, this.objectArt.muzzleFlash.length - 1);
            const muzzleOffset = this.objectArt.muzzleFlash[muzzleIndex];
            const weapon = this.gameObject.owner.country?.side === a.SideType.GDI
                ? this.gameObject.primaryWeapon
                : this.gameObject.secondaryWeapon;
            if (weapon) {
                const muzzleAnimNames = weapon.rules.anim;
                if (muzzleAnimNames.length) {
                    const muzzleAnim = muzzleAnimNames[u.getRandomInt(0, muzzleAnimNames.length - 1)];
                    let t = { x: e.x + muzzleOffset.x, y: e.y + muzzleOffset.y };
                    return i.createAnim(muzzleAnim, (e) => {
                        e.extraOffset = t;
                    }, true);
                }
            }
        }
    }
    createAnimObject(e, t, i, r, s) {
        const art = e.art;
        let n = new y.AnimProps(art, t);
        (e.type !== A.AnimationType.BUILDUP &&
            e.type !== A.AnimationType.UNBUILD) ||
            (() => {
                const frameCount = n.shadow ? t.numImages / 2 : t.numImages;
                n.rate = frameCount / (60 * this.rules.general.buildupTime);
            })();
        const offset = { x: i.x + e.offset.x, y: i.y + e.offset.y };
        let l = T.ShpRenderable.factory(this.aggregatedImageData.file, this.palette, this.camera, offset, n.shadow, 0, !e.flat, r, s && !e.flat);
        return (l.setSize(t),
            l.setFrameOffset(this.aggregatedImageData.imageIndexes.get(t)),
            l.setBatched(this.useSpriteBatching),
            this.useSpriteBatching &&
                l.setBatchPalettes(this.paletteRemaps),
            l.setFlat(e.flat),
            (e.translucent || 0 < e.translucency) &&
                l.setForceTransparent(true),
            l.create3DObject(),
            this.animations.set(l, new f.Animation(n, this.gameSpeed)),
            l);
    }
    createBibObject(e, t) {
        let i = T.ShpRenderable.factory(this.aggregatedImageData.file, this.palette, this.camera, t, this.objectArt.hasShadow);
        return (i.setSize(e),
            i.setFrameOffset(this.aggregatedImageData.imageIndexes.get(e)),
            i.setBatched(this.useSpriteBatching),
            this.useSpriteBatching &&
                i.setBatchPalettes(this.paletteRemaps),
            i.setFlat(true),
            i);
    }
    createTurretObject(i, e) {
        this.turretBuilders = [];
        let r = new THREE.Object3D();
        r.matrixAutoUpdate = false;
        let s = new THREE.Object3D();
        s.matrixAutoUpdate = false;
        let a = this.objectRules.turretAnim;
        var n = {
            x: this.objectRules.turretAnimX,
            y: this.objectRules.turretAnimY,
        };
        let o;
        if (this.objectRules.turretAnimIsVoxel) {
            var l = !this.objectArt.noHva;
            let t = a.toLowerCase() + ".vxl";
            var c = this.voxels.get(t);
            if (c) {
                var h = l
                    ? this.voxelAnims.get(t.replace(".vxl", ".hva"))
                    : void 0;
                let e = this.vxlBuilderFactory.create(c, h, this.paletteRemaps, this.palette);
                this.turretBuilders.push(e),
                    (o = e.build()),
                    o.children.forEach((e) => (e.castShadow = false));
            }
            else
                console.warn(`Turret missing for building ${this.type}. Vxl file ${t} not found. `);
            if (a.toLowerCase().includes("tur")) {
                let i = t.replace("tur", "barl");
                h = this.voxels.get(i);
                if (h) {
                    var u = l
                        ? this.voxelAnims.get(i.replace(".vxl", ".hva"))
                        : void 0;
                    let e = this.vxlBuilderFactory.create(h, u, this.paletteRemaps, this.palette);
                    this.turretBuilders.push(e);
                    let t = e.build();
                    t.children.forEach((e) => (e.castShadow = false)),
                        s.add(t);
                }
            }
            u = g.Coords.screenDistanceToWorld(n.x, n.y);
            (r.position.x = -e.x + u.x), (r.position.z = -e.y + u.y);
        }
        else {
            let t;
            try {
                t = this.imageFinder.find(a, this.objectArt.useTheaterExtension);
            }
            catch (e) {
                if (!(e instanceof MissingImageError))
                    throw e;
                console.warn(e.message);
            }
            if (t) {
                let e = new d.ShpBuilder(t, this.palette, this.camera, g.Coords.ISO_WORLD_SCALE, true, 2);
                e.setBatched(this.useSpriteBatching),
                    this.useSpriteBatching &&
                        e.setBatchPalettes(this.paletteRemaps),
                    this.turretBuilders.push(e),
                    e.setOffset({ x: i.x + n.x, y: i.y + n.y }),
                    (o = e.build());
            }
        }
        return (o && s.add(o),
            r.add(s),
            M.MathUtils.translateTowardsCamera(r, this.camera, -(this.objectRules.turretAnimZAdjust +
                this.objectRules.turretAnimY /
                    Math.cos(this.camera.rotation.y)) * g.Coords.ISO_WORLD_SCALE),
            r.updateMatrix(),
            { turret: r, turretRot: s });
    }
    createRangeCircle(e) {
        var t = e * g.Coords.getWorldTileSize();
        let i = this.gameObject.owner.color, r = s.OverlayUtils.createGroundCircle(t, i.asHex());
        return (r.matrixAutoUpdate = false), r.updateMatrix(), r;
    }
    toggleRangeCircleVisibility(e) {
        var t;
        this.rangeCircleWrapper &&
            ((this.rangeCircleWrapper.visible = e),
                (t = this.gameObject.overpoweredTrait?.isOverpowered()) !==
                    this.lastOverpowered &&
                    ((this.lastOverpowered = t),
                        this.rangeCircle &&
                            (this.rangeCircleWrapper.remove(this.rangeCircle),
                                this.rangeCircle.material.dispose(),
                                this.rangeCircle.geometry.dispose()),
                        (t =
                            this.gameObject.overpoweredTrait?.getWeapon()?.range) &&
                            ((this.rangeCircle = this.createRangeCircle(t)),
                                this.rangeCircleWrapper.add(this.rangeCircle))));
    }
    setAnimationVisibility(e, i, t = -1) {
        let r = this.animObjects.get(e);
        if (void 0 === r)
            throw new Error(`Missing animObjects for animType "${A.AnimationType[e]}"`);
        if (-1 !== t) {
            if (t >= r.length) {
                t = Math.max(0, r.length - 1);
            }
            r = [r[t]];
        }
        for (var s of r) {
            s.get3DObject().visible = i;
            let e = this.animations.get(s).props.getArt(), t = e.getString("Report");
            (t = t || e.getString("StartSound")),
                t && this.handleSoundChange(t, s, i);
        }
    }
    setActiveAnimationVisible() {
        let e = this.animArtProps.getByType(A.AnimationType.ACTIVE);
        this.objectRules.refinery && (e = [e[0]]),
            e.forEach(({ showWhenUnpowered: e }, t) => {
                try {
                    this.setAnimationVisibility(A.AnimationType.ACTIVE, this.powered || e, t);
                }
                catch (e) {
                    RangeError;
                }
            });
    }
    setPowered(r) {
        if (((this.powered = r),
            this.currentAnimType === A.AnimationType.IDLE &&
                this.setActiveAnimationVisible(),
            this.objectRules.superWeapon &&
                this.hasAnimation(A.AnimationType.SUPER))) {
            var [t, i] = this.getNormalizedAnimType(A.AnimationType.SUPER_CHARGE_LOOP), s = this.animObjects.get(t);
            if (void 0 === s)
                throw new Error(`Missing anim object for normalized anim type "${A.AnimationType[t]}"`);
            i = s[i];
            let e = this.animations.get(i);
            r ? e.unpause() : e.pause();
        }
        else
            this.animObjects
                .get(A.AnimationType.ACTIVE)
                .forEach((e, t) => {
                let i = this.animations.get(e);
                i &&
                    (!r &&
                        this.animArtProps.getByType(A.AnimationType.ACTIVE)[t]
                            .pauseWhenUnpowered
                        ? i.pause()
                        : i.unpause());
            });
    }
    hasAnimation(e) {
        return (e === A.AnimationType.IDLE ||
            (([e] = this.getNormalizedAnimType(e)),
                this.animObjects.has(e) && !!this.animObjects.get(e).length));
    }
    setAnimation(e, t) {
        if (!this.gameObject.healthTrait.health)
            throw new Error("We can't switch building animation for a destroyed building");
        this.hasAnimation(e) || (e = A.AnimationType.IDLE);
        const startIdleAnimation = () => {
            this.currentAnimType = A.AnimationType.IDLE;
            if (this.objectRules.superWeapon &&
                this.hasAnimation(A.AnimationType.SUPER)) {
                this.setAnimationVisibility(A.AnimationType.SUPER, true, 0);
                const superAnim = this.animObjects.get(A.AnimationType.SUPER)[0];
                this.animations.get(superAnim).start(t);
            }
            else {
                this.setAnimationVisibility(A.AnimationType.IDLE, true);
                this.animObjects
                    .get(A.AnimationType.IDLE)
                    .forEach((e) => {
                    this.animations.get(e).start(t);
                });
            }
        };
        let handled = false;
        switch ((this.currentAnimType = e,
            this.setAnimationVisibility(A.AnimationType.IDLE, false),
            this.setAnimationVisibility(A.AnimationType.SPECIAL, false),
            this.setAnimationVisibility(A.AnimationType.PRODUCTION, false),
            this.setAnimationVisibility(A.AnimationType.SUPER, false),
            this.setAnimationVisibility(A.AnimationType.BUILDUP, false),
            this.setAnimationVisibility(A.AnimationType.UNBUILD, false),
            this.setAnimationVisibility(A.AnimationType.FACTORY_DEPLOYING, false),
            this.setAnimationVisibility(A.AnimationType.FACTORY_ROOF_DEPLOYING, false),
            this.setActiveAnimationVisible(),
            e !== A.AnimationType.BUILDUP &&
                e !== A.AnimationType.UNBUILD
                ? (this.mainObj &&
                    (this.mainObj.get3DObject().visible = true),
                    this.bib && (this.bib.get3DObject().visible = true),
                    this.turret && (this.turret.visible = true))
                : (this.mainObj &&
                    (this.mainObj.get3DObject().visible = false),
                    this.bib && (this.bib.get3DObject().visible = false),
                    this.turret && (this.turret.visible = false)),
            (e !== A.AnimationType.FACTORY_DEPLOYING &&
                e !== A.AnimationType.FACTORY_ROOF_DEPLOYING) ||
                (this.mainObj &&
                    (this.mainObj.get3DObject().visible = false)),
            e)) {
            case A.AnimationType.PRODUCTION:
                this.setAnimationVisibility(A.AnimationType.PRODUCTION, true),
                    this.animObjects
                        .get(A.AnimationType.PRODUCTION)
                        .forEach((e) => {
                        this.animations.get(e).start(t);
                    });
                handled = true;
                break;
            case A.AnimationType.BUILDUP:
                this.setAnimationVisibility(A.AnimationType.ACTIVE, false),
                    this.setAnimationVisibility(A.AnimationType.BUILDUP, true),
                    this.animObjects
                        .get(A.AnimationType.BUILDUP)
                        .forEach((e) => {
                        this.animations.get(e).start(t);
                    });
                handled = true;
                break;
            case A.AnimationType.UNBUILD:
                this.setAnimationVisibility(A.AnimationType.ACTIVE, false),
                    this.setAnimationVisibility(A.AnimationType.UNBUILD, true),
                    this.animObjects
                        .get(A.AnimationType.UNBUILD)
                        .forEach((e) => {
                        this.animations.get(e).start(t);
                    });
                handled = true;
                break;
            case A.AnimationType.FACTORY_DEPLOYING:
                if (this.hasAnimation(A.AnimationType.FACTORY_DEPLOYING) &&
                    this.objectRules.factory) {
                    this.setAnimationVisibility(A.AnimationType.FACTORY_DEPLOYING, true),
                        this.animObjects
                            .get(A.AnimationType.FACTORY_DEPLOYING)
                            .forEach((e) => {
                            this.animations.get(e).start(t);
                        });
                    handled = true;
                }
                break;
            case A.AnimationType.FACTORY_ROOF_DEPLOYING:
                if (this.hasAnimation(A.AnimationType.FACTORY_ROOF_DEPLOYING) &&
                    this.objectRules.factory) {
                    this.setAnimationVisibility(A.AnimationType.FACTORY_ROOF_DEPLOYING, true),
                        this.animObjects
                            .get(A.AnimationType.FACTORY_ROOF_DEPLOYING)
                            .forEach((e) => {
                            this.animations.get(e).start(t);
                        });
                    handled = true;
                }
                break;
            case A.AnimationType.SPECIAL_REPAIR_START:
            case A.AnimationType.SPECIAL_REPAIR_LOOP:
            case A.AnimationType.SPECIAL_REPAIR_END:
            case A.AnimationType.SPECIAL_DOCKING:
                if (this.hasAnimation(A.AnimationType.SPECIAL) &&
                    ((e === A.AnimationType.SPECIAL_DOCKING &&
                        this.objectRules.refinery) ||
                        (e !== A.AnimationType.SPECIAL_DOCKING &&
                            this.objectRules.unitRepair))) {
                    var [i, r] = this.getNormalizedAnimType(e);
                    this.setAnimationVisibility(i, true, r);
                    {
                        const list = this.animObjects.get(i);
                        r = list[Math.min(r, list.length - 1)];
                    }
                    this.animations.get(r).start(t);
                    handled = true;
                }
                break;
            case A.AnimationType.SPECIAL_SHOOT:
                if (this.objectRules.isBaseDefense) {
                    this.setAnimationVisibility(A.AnimationType.ACTIVE, false);
                    var [r, s] = this.getNormalizedAnimType(e);
                    this.setAnimationVisibility(r, true, s);
                    {
                        const list = this.animObjects.get(r);
                        s = list[Math.min(s, list.length - 1)];
                    }
                    this.animations.get(s).start(t);
                    handled = true;
                }
                break;
            case A.AnimationType.SUPER_CHARGE_START:
            case A.AnimationType.SUPER_CHARGE_LOOP:
            case A.AnimationType.SUPER_CHARGE_END:
                if (this.objectRules.superWeapon &&
                    this.hasAnimation(A.AnimationType.SUPER)) {
                    var [s, a] = this.getNormalizedAnimType(e);
                    this.setAnimationVisibility(s, true, a);
                    {
                        const list = this.animObjects.get(s);
                        a = list[Math.min(a, list.length - 1)];
                    }
                    this.animations.get(a).start(t);
                    handled = true;
                }
                break;
            case A.AnimationType.IDLE:
            default:
                startIdleAnimation();
                handled = true;
        }
        handled || startIdleAnimation();
    }
    doWithAnimation(e, i) {
        var [t, r] = this.getNormalizedAnimType(e);
        let s = this.animObjects.get(t);
        if (void 0 === s)
            throw new Error(`Missing animObjects for anim type "${A.AnimationType[t]}"`);
        t !== e && (s = [s[r]]),
            s.forEach((e, t) => {
                i(this.animations.get(e), e);
            });
    }
    doWithCurrentAnimation(e) {
        this.doWithAnimation(this.currentAnimType, e);
    }
    endCurrentAnimation() {
        this.doWithCurrentAnimation((e) => e.endLoop());
    }
    handleSoundChange(e, t, i, r = 1) {
        if (i) {
            var s;
            (this.animSounds.has(t) &&
                this.animSounds.get(t).isPlaying()) ||
                ((s = this.worldSound?.playEffect(e, this.gameObject, this.gameObject.owner, r)) &&
                    this.animSounds.set(t, s));
        }
        else {
            let e = this.animSounds.get(t);
            e && e.isLoop && (e.stop(), this.animSounds.delete(t));
        }
    }
    onCreate(t) {
        (this.renderableManager = t),
            this.plugins.forEach((e) => e.onCreate(t)),
            this.objectRules.ambientSound &&
                (this.ambientSound = this.worldSound?.playEffect(this.objectRules.ambientSound, this.gameObject, void 0, 0.25)),
            this.pipOverlay?.onCreate(t);
    }
    onRemove(t) {
        if (((this.renderableManager = void 0),
            this.plugins.forEach((e) => e.onRemove(t)),
            this.animSounds.forEach((e) => e.stop()),
            this.ambientSound?.stop(),
            this.turretRotateSound?.stop(),
            this.poweredSound?.stop(),
            this.gameObject.isDestroyed))
            return this.gameObject.deathType === n.DeathType.Temporal ||
                this.gameObject.deathType === n.DeathType.None
                ? void 0
                : void (this.objectRules.explosion?.length &&
                    this.createExplosionAnims(t));
    }
    dispose() {
        this.plugins.forEach((e) => e.dispose()),
            this.pipOverlay?.dispose(),
            this.placeholderObj?.dispose(),
            this.mainObj?.dispose(),
            this.rubbleObj?.dispose(),
            this.bib?.dispose(),
            this.fireObjects?.forEach((e) => e.dispose()),
            this.turretBuilders?.forEach((e) => e.dispose()),
            [...(this.animObjects?.values() ?? [])].forEach((e) => e.forEach((e) => e.dispose()));
    }
}
