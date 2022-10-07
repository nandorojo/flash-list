import { roundToDecimalPlaces } from "./roundToDecimalPlaces";

/**
 * Can be used to monitor JS thread frame times
 * Use startTracking() and stopAndGetData() to start and stop tracking
 */
export class FrameTimeMonitor {
  private static tasks: (((time: number) => void) | undefined)[] = [];
  private static monitors: FrameTimeMonitor[] = [];
  private static clearAnimationNumber = 0;
  private static originalRequestAnimationFrame = global.requestAnimationFrame;
  private static originalCancelAnimationFrame = global.cancelAnimationFrame;

  private static customRAF = (callback: (time: number) => void): number => {
    FrameTimeMonitor.tasks.push(callback);
    return FrameTimeMonitor.tasks.length - 1;
  };

  private static customCAF = (id: number) => {
    FrameTimeMonitor.tasks[id] = undefined;
  };

  private static flushAll() {
    const tasksToRun = FrameTimeMonitor.tasks;
    FrameTimeMonitor.tasks = [];
    tasksToRun.forEach((task) => task?.(Date.now()));
  }

  private static removeMonitor(monitor: FrameTimeMonitor) {
    const index = FrameTimeMonitor.monitors.indexOf(monitor);
    if (index !== -1) {
      FrameTimeMonitor.monitors.splice(index, 1);
    }
  }

  private static updateLoopCompute = () => {
    const startTime = Date.now();

    const tasksToRun = FrameTimeMonitor.tasks;
    FrameTimeMonitor.tasks = [];
    tasksToRun.forEach((task) => task?.(Date.now()));
    setTimeout(() => {
      setTimeout(() => {
        FrameTimeMonitor.monitors.forEach((monitor) => {
          monitor.updateFrameTime(Date.now() - startTime);
        });
        FrameTimeMonitor.measureLoop();
      }, 0);
    }, 0);
  };

  private static measureLoop() {
    // This looks weird but I'm avoiding a new closure
    FrameTimeMonitor.clearAnimationNumber =
      FrameTimeMonitor.originalRequestAnimationFrame(
        FrameTimeMonitor.updateLoopCompute
      );
  }

  private min = Number.MAX_SAFE_INTEGER;
  private max = 0;
  private average = 0;
  private frameCount = 0;
  private isRunning = false;

  private updateFrameTime(frameTime: number) {
    if (frameTime > 0) {
      //console.log("frameTime", frameTime);
    }
    this.min = Math.min(this.min, frameTime);
    this.max = Math.max(this.max, frameTime);
    this.average =
      (this.average * this.frameCount) / (this.frameCount + 1) +
      frameTime / (this.frameCount + 1);
    this.frameCount++;
  }

  public startTracking() {
    if (this.isRunning) {
      throw new Error(
        "This frame time monitor has already been run, please create a new instance"
      );
    }
    this.isRunning = true;
    FrameTimeMonitor.monitors.push(this);
    if (
      requestAnimationFrame === FrameTimeMonitor.originalRequestAnimationFrame
    ) {
      console.log("requestAnimationFrame - attach");
      global.requestAnimationFrame = FrameTimeMonitor.customRAF;
      global.cancelAnimationFrame = FrameTimeMonitor.customCAF;
      FrameTimeMonitor.measureLoop();
    }
  }

  public stopAndGetData(): FrameMonitorResult {
    FrameTimeMonitor.removeMonitor(this);
    if (FrameTimeMonitor.monitors.length === 0) {
      FrameTimeMonitor.originalCancelAnimationFrame(
        FrameTimeMonitor.clearAnimationNumber
      );
      global.requestAnimationFrame =
        FrameTimeMonitor.originalRequestAnimationFrame;
      global.cancelAnimationFrame =
        FrameTimeMonitor.originalCancelAnimationFrame;
      FrameTimeMonitor.flushAll();
      console.log(
        "requestAnimationFrame - detach",
        requestAnimationFrame === FrameTimeMonitor.originalRequestAnimationFrame
      );
    }
    return {
      min: roundToDecimalPlaces(this.min, 2),
      max: roundToDecimalPlaces(this.max, 2),
      average: roundToDecimalPlaces(this.average, 2),
    };
  }
}

export interface FrameMonitorResult {
  min: number;
  max: number;
  average: number;
}
