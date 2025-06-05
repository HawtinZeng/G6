import { Circle } from '@antv/g6';

export class BreathingCircle extends Circle {
  onCreate() {
    const halo = this.shapeMap.halo;
    halo.animate([{ lineWidth: 0 }, { lineWidth: 20 }], {
      iterations: Infinity,
      direction: 'alternate',
      duration: 1000,
    });
  }
}
