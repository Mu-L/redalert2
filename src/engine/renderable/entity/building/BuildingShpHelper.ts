import { AnimProps } from "@/engine/AnimProps";
import { ImageFinder, MissingImageError } from "@/engine/ImageFinder";
import { ShpAggregator } from "@/engine/renderable/builder/ShpAggregator";
import { ShpFile } from "@/data/ShpFile";
import { BuildingAnimArtProps } from "./BuildingAnimArtProps";
import { BuildingAnimData } from "./BuildingAnimData";
export class BuildingShpHelper {
    constructor(private imageFinder: ImageFinder) { }
    getShpFrameInfos(building: {
        hasShadow: boolean;
    }, mainShp: ShpFile | undefined, turretShp: ShpFile | undefined, animShps: Map<BuildingAnimData, ShpFile>): Map<ShpFile, any> {
        const frameInfos = new Map<ShpFile, any>();
        if (mainShp) {
            frameInfos.set(mainShp, ShpAggregator.getShpFrameInfo(mainShp, building.hasShadow));
        }
        if (turretShp) {
            frameInfos.set(turretShp, ShpAggregator.getShpFrameInfo(turretShp, building.hasShadow));
        }
        for (const [anim, shpName] of animShps) {
            const animProps = new AnimProps(anim.art, shpName);
            const frameInfo = ShpAggregator.getShpFrameInfo(shpName, animProps.shadow);
            frameInfos.set(shpName, frameInfo);
        }
        return frameInfos;
    }
    collectAnimShpFiles(anims: BuildingAnimArtProps, options: {
        useTheaterExtension: boolean;
    }): Map<BuildingAnimData, ShpFile> {
        const shpFiles = new Map<BuildingAnimData, ShpFile>();
        anims.getAll().forEach((animList) => {
            for (const anim of animList) {
                let shpFile: ShpFile;
                try {
                    shpFile = this.imageFinder.find(anim.image, options.useTheaterExtension);
                }
                catch (error) {
                    if (error instanceof MissingImageError) {
                        console.warn(error.message);
                        continue;
                    }
                    throw error;
                }
                shpFiles.set(anim, shpFile);
            }
        });
        return shpFiles;
    }
}
